import { createContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { AuthStateHook, useAuthState } from 'react-firebase-hooks/auth';
import { CallableFunctions } from './types';
import { callableFunctions, firebaseAuth, firebaseFunctions } from './utils';
import {
  ArchiveDocumentPayload,
  ArchiveResponse,
  CreatePayload,
  CreateResponse,
  GetAllPayload,
  GetAllResponse,
  StoreDocument,
  StoreDocumentNames,
} from 'src/utils/cloudFunctionTypes';
import { HttpsCallable, httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

interface ContextType extends CallableFunctions {
  signIn: { google: () => Promise<void> };
  signOut: () => Promise<void>;
  loading: boolean;
  authState: {
    authorized: boolean;
    user: AuthStateHook['0'];
    loading: AuthStateHook['1'];
    error: AuthStateHook['2'];
  };
  storeData: {
    areas?: GetAllResponse<'Area'>;
    builders?: GetAllResponse<'Builder'>;
    communities?: GetAllResponse<'Community'>;
    contractors?: GetAllResponse<'Contractor'>;
    companies?: GetAllResponse<'Company'>;
    reporters?: GetAllResponse<'Reporter'>;
    scopes?: GetAllResponse<'Scope'>;
    suppliers?: GetAllResponse<'Supplier'>;
  };
  refreshStoreData: (collection: StoreDocumentNames) => Promise<void>;
  archiveStoreDocument: (collection: StoreDocumentNames, id: string) => Promise<void>;
  createDocument: <TCollection extends StoreDocumentNames, YPayload extends CreatePayload[TCollection]>(
    collection: TCollection,
    data: YPayload
  ) => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

// Initial Context
const initialContext: ContextType = {
  signIn: { google: () => new Promise(() => {}) },
  signOut: () => new Promise(() => {}),
  loading: false,
  authState: {
    authorized: false,
    user: undefined,
    loading: false,
    error: undefined,
  },
  storeData: {
    areas: undefined,
    builders: undefined,
    communities: undefined,
    contractors: undefined,
    companies: undefined,
    reporters: undefined,
    scopes: undefined,
    suppliers: undefined,
  },
  refreshStoreData: () => new Promise(() => {}),
  archiveStoreDocument: () => new Promise(() => {}),
  createDocument: () => new Promise(() => {}),
  ...callableFunctions,
};

// Context
export const FirebaseContext = createContext<ContextType>(initialContext);

// Provider
export const FirebaseProvider = ({ children }: ProviderProps) => {
  /** CUSTOM **/
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  /** STATE **/
  // Auth
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuthorized, setCheckingAuthorized] = useState(true);
  // Data
  const [areaData, setAreaData] = useState<GetAllResponse<'Area'>>();
  const [builderData, setBuilderData] = useState<GetAllResponse<'Builder'>>();
  const [communityData, setCommunityData] = useState<GetAllResponse<'Community'>>();
  const [contractorData, setContractorData] = useState<GetAllResponse<'Contractor'>>();
  const [companyData, setCompanyData] = useState<GetAllResponse<'Company'>>();
  const [reporterData, setReporterData] = useState<GetAllResponse<'Reporter'>>();
  const [scopeData, setScopeData] = useState<GetAllResponse<'Scope'>>();
  const [supplierData, setSupplierData] = useState<GetAllResponse<'Supplier'>>();
  // Loading
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  /** EFFECTS **/
  useEffect(() => {
    if (authorized) {
      // Get all base data
      // areas
      !areaData && refreshStoreData('Area');
      // builders
      !builderData && refreshStoreData('Builder');
      // communities
      !communityData && refreshStoreData('Community');
      // companies
      !companyData && refreshStoreData('Company');
      // contractors
      !contractorData && refreshStoreData('Contractor');
      // reporters
      !reporterData && refreshStoreData('Reporter');
      // scopes
      !scopeData && refreshStoreData('Scope');
      // suppliers
      !supplierData && refreshStoreData('Supplier');
    }
  }, [authorized]);

  useEffect(() => {
    _checkAuth();
  }, [authUser, authLoading]);

  /** FUNCTIONS **/
  // Auth
  const signInGoogle = async () => {
    const googleProvider = new fbGoogleAuthProvider();
    await fbSignInWithPopup(firebaseAuth, googleProvider);
  };

  const signOut = async () => {
    setAuthorized(false);
    await fbSignOut(firebaseAuth);
  };

  // App Data
  const refreshStoreData = async <T extends StoreDocumentNames>(collection: T) => {
    const getAll = httpsCallable<GetAllPayload, GetAllResponse<T>>(firebaseFunctions, 'getAll');

    _toggleLoading(collection, true);

    await getAll({ collection, status: 'active' })
      .then((resp) => {
        switch (collection) {
          case 'Area':
            setAreaData(resp.data as GetAllResponse<'Area'>);
            break;
          case 'Builder':
            setBuilderData(resp.data as GetAllResponse<'Builder'>);
            break;
          case 'Community':
            setCommunityData(resp.data as GetAllResponse<'Community'>);
            break;
          case 'Company':
            setCompanyData(resp.data as GetAllResponse<'Company'>);
            break;
          case 'Contractor':
            setContractorData(resp.data as GetAllResponse<'Contractor'>);
            break;
          case 'Reporter':
            setReporterData(resp.data as GetAllResponse<'Reporter'>);
            break;
          case 'Scope':
            setScopeData(resp.data as GetAllResponse<'Scope'>);
            break;
          case 'Supplier':
            setSupplierData(resp.data as GetAllResponse<'Supplier'>);
            break;
          default:
            console.warn('incorrect collection for getAll');
        }
      })
      .finally(() => {
        _toggleLoading(collection, false);
      });
  };

  const archiveStoreDocument = async (collection: StoreDocumentNames, id: string) => {
    const archiveDocument = httpsCallable<ArchiveDocumentPayload, ArchiveResponse>(
      firebaseFunctions,
      'archiveDocument'
    );

    _toggleLoading(collection, true);

    try {
      await archiveDocument({ collection, id });
      await refreshStoreData(collection);
    } catch (e: any) {
      e.message && toast.error(e.message);
    } finally {
      _toggleLoading(collection, false);
    }
  };

  const createDocument = async <TCollection extends StoreDocumentNames, YPayload = CreatePayload[TCollection]>(
    collection: TCollection,
    data: YPayload
  ) => {
    let functionName = '';

    switch (collection) {
      case 'Area':
        functionName = 'areaCreate';
        break;
      case 'Builder':
        functionName = 'builderCreate';
        break;
      case 'Community':
        functionName = 'communityCreate';
        break;
      case 'Company':
        functionName = 'companyCreate';
        break;
      case 'Contractor':
        functionName = 'contractorCreate';
        break;
      case 'JobLegacy':
        functionName = 'jobLegacyCreate';
        break;
      case 'Reporter':
        functionName = 'reporterCreate';
        break;
      case 'Scope':
        functionName = 'scopeCreate';
        break;
      case 'Supplier':
        functionName = 'supplierCreate';
        break;
    }

    const createDocumentCallable: HttpsCallable<YPayload, CreateResponse> = httpsCallable(
      firebaseFunctions,
      functionName
    );

    try {
      _toggleLoading(collection, true);
      await createDocumentCallable(data);
      await refreshStoreData(collection);
    } catch (e: any) {
      e.message && toast.error(e.message);
    } finally {
      _toggleLoading(collection, false);
    }
  };

  /** HELPERS **/
  const _checkAuth = async () => {
    setCheckingAuthorized(true);

    if (authLoading) {
      return;
    }

    if (authUser) {
      await authUser.getIdTokenResult(true).then((result) => {
        setAuthorized(!!result.claims.authorized);
      });
    }

    setCheckingAuthorized(false);
  };

  const _toggleLoading = (param: string, state: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [param]: state }));
  };

  const _providerValues = {
    signIn: {
      google: signInGoogle,
    },
    loading: Object.values(loadingStates).some((state) => state),
    signOut,
    authState: {
      authorized: authorized,
      user: authUser,
      loading: authLoading || checkingAuthorized,
      error: authError,
    },
    storeData: {
      areas: areaData,
      builders: builderData,
      communities: communityData,
      contractors: contractorData,
      companies: companyData,
      reporters: reporterData,
      scopes: scopeData,
      suppliers: supplierData,
    },
    refreshStoreData,
    archiveStoreDocument,
    createDocument,
    ...callableFunctions,
  };

  /** PROVIDER **/
  return <FirebaseContext.Provider value={_providerValues}>{children}</FirebaseContext.Provider>;
};

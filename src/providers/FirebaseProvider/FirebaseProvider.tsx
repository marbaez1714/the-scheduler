import { createContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContextParams, FirebaseProviderProps } from './types';
import { callableFunctions, firebaseAuth } from './utils';
import { GetAllResponse } from 'src/utils/cloudFunctionTypes';

// Initial Context
const initialContext: FirebaseContextParams = {
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
  refreshStoreData: {
    areas: () => new Promise(() => {}),
    builders: () => new Promise(() => {}),
    communities: () => new Promise(() => {}),
    contractors: () => new Promise(() => {}),
    companies: () => new Promise(() => {}),
    reporters: () => new Promise(() => {}),
    scopes: () => new Promise(() => {}),
    suppliers: () => new Promise(() => {}),
  },
  ...callableFunctions,
};

// Context
export const FirebaseContext = createContext<FirebaseContextParams>(initialContext);

// Provider
const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  // - HOOKS - //
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  // - STATE - //
  // Auth
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuthorized, setCheckingAuthorized] = useState(true);
  // Data
  const [areasData, setAreasData] = useState<GetAllResponse<'Area'>>();
  const [buildersData, setBuildersData] = useState<GetAllResponse<'Builder'>>();
  const [communitiesData, setCommunitiesData] = useState<GetAllResponse<'Community'>>();
  const [contractorsData, setContractorsData] = useState<GetAllResponse<'Contractor'>>();
  const [companiesData, setCompaniesData] = useState<GetAllResponse<'Company'>>();
  const [reportersData, setReportersData] = useState<GetAllResponse<'Reporter'>>();
  const [scopesData, setScopesData] = useState<GetAllResponse<'Scope'>>();
  const [suppliersData, setSuppliersData] = useState<GetAllResponse<'Supplier'>>();
  // Loading
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    areas: false,
    builders: false,
    communities: false,
    contractors: false,
    companies: false,
    reporters: false,
    scopes: false,
    suppliers: false,
  });

  // - EFFECTS - //
  useEffect(() => {
    if (authorized) {
      // Get all base data
      // areas
      !areasData && refreshAreas();
      // builders
      !buildersData && refreshBuilders();
      // communities
      !communitiesData && refreshCommunities();
      // contractors
      !contractorsData && refreshContractors();
      // companies
      !companiesData && refreshCompanies();
      // reporters
      !reportersData && refreshReporters();
      // scopes
      !scopesData && refreshScopes();
      // suppliers
      !suppliersData && refreshSuppliers();
    }
  }, [authorized]);

  useEffect(() => {
    _checkAuth();
  }, [authUser, authLoading]);

  // - CONTEXT FUNCTIONS - //

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
  const refreshAreas = async () => {
    _toggleLoading('areas', true);
    await callableFunctions
      .areaGetAll()
      .then((response) => {
        setAreasData(response.data);
      })
      .finally(() => {
        _toggleLoading('areas', false);
      });
  };

  const refreshBuilders = async () => {
    _toggleLoading('builders', true);
    await callableFunctions
      .builderGetAll()
      .then((response) => {
        setBuildersData(response.data);
      })
      .finally(() => {
        _toggleLoading('builders', false);
      });
  };

  const refreshCommunities = async () => {
    _toggleLoading('communities', true);
    await callableFunctions
      .communityGetAll()
      .then((response) => {
        setCommunitiesData(response.data);
      })
      .finally(() => {
        _toggleLoading('communities', false);
      });
  };

  const refreshContractors = async () => {
    _toggleLoading('contractors', true);
    await callableFunctions
      .contractorGetAll()
      .then((response) => {
        setContractorsData(response.data);
      })
      .finally(() => {
        _toggleLoading('contractors', false);
      });
  };

  const refreshCompanies = async () => {
    _toggleLoading('companies', true);
    await callableFunctions
      .companyGetAll()
      .then((response) => {
        setCompaniesData(response.data);
      })
      .finally(() => {
        _toggleLoading('companies', false);
      });
  };

  const refreshReporters = async () => {
    _toggleLoading('reporters', true);
    await callableFunctions
      .reporterGetAll()
      .then((response) => {
        setReportersData(response.data);
      })
      .then(() => {
        _toggleLoading('reporters', false);
      });
  };

  const refreshScopes = async () => {
    _toggleLoading('scopes', true);
    await callableFunctions
      .scopeGetAll()
      .then((response) => {
        setScopesData(response.data);
      })
      .finally(() => {
        _toggleLoading('scopes', false);
      });
  };

  const refreshSuppliers = async () => {
    _toggleLoading('suppliers', true);
    await callableFunctions
      .supplierGetAll()
      .then((response) => {
        setSuppliersData(response.data);
      })
      .finally(() => {
        _toggleLoading('suppliers', false);
      });
  };

  // - HELPERS - //
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

  // - PROVIDER - //
  return (
    <FirebaseContext.Provider
      value={{
        signIn: {
          google: signInGoogle,
        },
        loading: Object.values(loadingStates).every((state) => state),
        signOut,
        authState: {
          authorized: authorized,
          user: authUser,
          loading: authLoading || checkingAuthorized,
          error: authError,
        },
        storeData: {
          areas: areasData,
          builders: buildersData,
          communities: communitiesData,
          contractors: contractorsData,
          companies: companiesData,
          reporters: reportersData,
          scopes: scopesData,
          suppliers: suppliersData,
        },
        refreshStoreData: {
          areas: refreshAreas,
          builders: refreshBuilders,
          communities: refreshCommunities,
          companies: refreshCompanies,
          contractors: refreshContractors,
          reporters: refreshReporters,
          scopes: refreshScopes,
          suppliers: refreshSuppliers,
        },
        ...callableFunctions,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

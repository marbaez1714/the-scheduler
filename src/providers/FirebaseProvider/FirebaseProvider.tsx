import { createContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContextParams, FirebaseProviderProps } from './types';
import { callableFunctions, firebaseAuth } from './utils';
import { GetAllResponse } from 'src/utils/firebase/types';

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
export const FirebaseContext =
  createContext<FirebaseContextParams>(initialContext);

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
  const [communitiesData, setCommunitiesData] =
    useState<GetAllResponse<'Community'>>();
  const [contractorsData, setContractorsData] =
    useState<GetAllResponse<'Contractor'>>();
  const [companiesData, setCompaniesData] =
    useState<GetAllResponse<'Company'>>();
  const [reportersData, setReportersData] =
    useState<GetAllResponse<'Reporter'>>();
  const [scopesData, setScopesData] = useState<GetAllResponse<'Scope'>>();
  const [suppliersData, setSuppliersData] =
    useState<GetAllResponse<'Supplier'>>();
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
    if (authUser) {
      setCheckingAuthorized(true);
      authUser
        .getIdTokenResult(true)
        .then((result) => {
          setAuthorized(!!result.claims.authorized);
        })
        .finally(() => setCheckingAuthorized(false));
    }
  }, [authUser]);

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
    handleLoading('areas', true);
    await callableFunctions
      .areasGetAll()
      .then((response) => {
        setAreasData(response.data);
      })
      .finally(() => {
        handleLoading('areas', false);
      });
  };

  const refreshBuilders = async () => {
    handleLoading('builders', true);
    await callableFunctions
      .buildersGetAll()
      .then((response) => {
        setBuildersData(response.data);
      })
      .finally(() => {
        handleLoading('builders', false);
      });
  };

  const refreshCommunities = async () => {
    handleLoading('communities', true);
    await callableFunctions
      .communitiesGetAll()
      .then((response) => {
        setCommunitiesData(response.data);
      })
      .finally(() => {
        handleLoading('communities', false);
      });
  };

  const refreshContractors = async () => {
    handleLoading('contractors', true);
    await callableFunctions
      .contractorsGetAll()
      .then((response) => {
        setContractorsData(response.data);
      })
      .finally(() => {
        handleLoading('contractors', false);
      });
  };

  const refreshCompanies = async () => {
    handleLoading('companies', true);
    await callableFunctions
      .companiesGetAll()
      .then((response) => {
        setCompaniesData(response.data);
      })
      .finally(() => {
        handleLoading('companies', false);
      });
  };

  const refreshReporters = async () => {
    handleLoading('reporters', true);
    await callableFunctions
      .reportersGetAll()
      .then((response) => {
        setReportersData(response.data);
      })
      .then(() => {
        handleLoading('reporters', false);
      });
  };

  const refreshScopes = async () => {
    handleLoading('scopes', true);
    await callableFunctions
      .scopesGetAll()
      .then((response) => {
        setScopesData(response.data);
      })
      .finally(() => {
        handleLoading('scopes', false);
      });
  };

  const refreshSuppliers = async () => {
    handleLoading('suppliers', true);
    await callableFunctions
      .suppliersGetAll()
      .then((response) => {
        setSuppliersData(response.data);
      })
      .finally(() => {
        handleLoading('suppliers', false);
      });
  };

  // TODO REFRESH ALL DATA

  // - HELPERS - //
  const handleLoading = (param: string, state: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [param]: state }));
  };

  // - SETTING CONTEXT - //

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

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
  authState: {
    authorized: false,
    user: undefined,
    loading: false,
    error: undefined,
  },
  storeData: {
    companies: undefined,
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
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuthorized, setCheckingAuthorized] = useState(true);
  const [companiesData, setCompaniesData] =
    useState<GetAllResponse<'Company'>>();

  // - EFFECTS - //
  useEffect(() => {
    if (authorized) {
      // Get all companies
      !companiesData && refreshCompanies();
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
  const refreshCompanies = async () => {
    await callableFunctions.companiesGetAll().then((response) => {
      setCompaniesData(response.data);
    });
  };

  // TODO REFRESH ALL DATA

  // - HELPERS - //
  const _signIn = {
    google: signInGoogle,
  };

  const _authState = {
    authorized: authorized,
    user: authUser,
    loading: authLoading || checkingAuthorized,
    error: authError,
  };

  const _storeData = {
    companies: companiesData,
  };

  // - SETTING CONTEXT - //
  const context = {
    signIn: _signIn,
    signOut,
    authState: _authState,
    storeData: _storeData,
    ...callableFunctions,
  };

  // - PROVIDER - //
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

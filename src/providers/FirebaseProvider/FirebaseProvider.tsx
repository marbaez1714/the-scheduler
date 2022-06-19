import { createContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
  User as fbAuth,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContextParams, FirebaseProviderProps } from './types';
import { callableFunctions, firebaseAuth } from './utils';

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
  ...callableFunctions,
};

// Context
export const FirebaseContext =
  createContext<FirebaseContextParams>(initialContext);

// Provider
const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  // ********** Hooks **********
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  // ********** State **********
  const [authorized, setAuthorized] = useState(false);

  // ********** Functions **********

  // Auth
  const signInGoogle = async () => {
    const googleProvider = new fbGoogleAuthProvider();
    const { user } = await fbSignInWithPopup(firebaseAuth, googleProvider);
    await _handleSignIn(user);
  };

  const signOut = async () => {
    setAuthorized(false);
    await fbSignOut(firebaseAuth);
  };

  // ********** Helpers **********
  const _handleSignIn = async (user: fbAuth) => {
    await user.getIdTokenResult(true).then((idToken) => {
      setAuthorized(!!idToken.claims.authorized);
    });
  };

  // ********** Setting Context **********
  const context = {
    signIn: { google: signInGoogle },
    signOut,
    authState: {
      authorized: authorized,
      user: authUser,
      loading: authLoading,
      error: authError,
    },
    ...callableFunctions,
  };

  // ********** Provider **********
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

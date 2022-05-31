import { createContext, useState } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
  User as fbAuth,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContextParams, FirebaseProviderProps } from './types';
import { firebaseAuth } from './utils';

// Context
export const FirebaseContext = createContext<FirebaseContextParams>({
  signIn: { google: () => new Promise(() => {}) },
  signOut: () => new Promise(() => {}),
  authUser: undefined,
  authLoading: false,
  authError: undefined,
  authorized: false,
});

// Provider
const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  // ***************************
  // ********** Hooks **********
  // ***************************
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  // ***************************
  // ********** State **********
  // ***************************
  const [authorized, setAuthorized] = useState(false);

  // *******************************
  // ********** Functions **********
  // *******************************
  const signInGoogle = async () => {
    const googleProvider = new fbGoogleAuthProvider();
    const { user } = await fbSignInWithPopup(firebaseAuth, googleProvider);
    await _handleSignIn(user);
  };

  const signOut = async () => {
    setAuthorized(false);
    await fbSignOut(firebaseAuth);
  };

  // *****************************
  // ********** Helpers **********
  // *****************************
  const _handleSignIn = async (user: fbAuth) => {
    await user.getIdTokenResult(true).then((idToken) => {
      console.log(idToken);
      setAuthorized(!!idToken.claims.authorized);
    });
  };

  // *************************************
  // ********** Setting Context **********
  // *************************************
  const context = {
    signIn: { google: signInGoogle },
    signOut,
    firebaseAuth,
    authUser,
    authLoading,
    authError,
    authorized,
  };

  // ******************************
  // ********** Provider **********
  // ******************************
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

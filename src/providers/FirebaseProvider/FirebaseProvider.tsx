import { createContext } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
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
});

// Provider
const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  // ---------- Hooks ----------
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  // ---------- State ----------
  // TODO

  // ---------- Functions ----------
  const signInGoogle = async () => {
    const googleProvider = new fbGoogleAuthProvider();
    await fbSignInWithPopup(firebaseAuth, googleProvider);
  };

  const signOut = async () => {
    await fbSignOut(firebaseAuth);
  };

  // ---------- Setting Context ----------
  const context = {
    signIn: { google: signInGoogle },
    signOut,
    firebaseAuth,
    authUser,
    authLoading,
    authError,
  };

  // ---------- Provider ----------
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

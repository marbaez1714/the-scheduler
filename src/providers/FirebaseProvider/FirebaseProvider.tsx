import { createContext } from 'react';

import {
  GoogleAuthProvider as fbGoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContextParams, FirebaseProviderProps } from './types';
import { firebaseAuth } from './utils';

export const FirebaseContext = createContext<FirebaseContextParams>({
  signIn: { google: () => {} },
  signOut: () => {},
  authUser: undefined,
  authLoading: false,
  authError: undefined,
});

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  // ---------- Hooks ----------
  const [authUser, authLoading, authError] = useAuthState(firebaseAuth);

  // ---------- State ----------

  // ---------- Functions ----------
  const signInGoogle = async () => {
    fbSignInWithPopup(firebaseAuth, new fbGoogleAuthProvider()).catch(
      console.error
    );
  };

  const signOut = async () => {
    fbSignOut(firebaseAuth);
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

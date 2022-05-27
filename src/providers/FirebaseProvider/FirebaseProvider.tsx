import { createContext } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import {
  getAuth as fbGetAuth,
  signInWithCustomToken as fbSignInWithCustomToken,
  signOut as fbSignOut,
} from 'firebase/auth';

import { initializeApp as fbInitializeApp } from 'firebase/app';
import {
  getFunctions as fbGetFunctions,
  httpsCallable,
} from 'firebase/functions';
import { FirebaseContextParams, FirebaseProviderProps } from './types';

export const FirebaseContext = createContext<FirebaseContextParams>({
  signIn: () => new Promise(() => {}),
  signOut: () => new Promise(() => {}),
});

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const { loginWithPopup, logout, getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  const firebaseApp = fbInitializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });

  const firebaseFunctions = fbGetFunctions(firebaseApp);

  const testCall = httpsCallable(firebaseFunctions, 'testCall');

  const signIn = async () => {
    // login with auth0
    await loginWithPopup();
    3;
    // get the auth token
    const auth0Token = await getAccessTokenSilently();
    // get google creds
    // const googleAuth = fbGetAuth();
    // use to sign in
    // await fbSignInWithCustomToken(googleAuth, auth0Token);
    console.log(auth0Token);
    // TEST
    testCall({ token: auth0Token })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  const signOut = async () => {
    const googleAuth = fbGetAuth();
    await logout();
    await fbSignOut(googleAuth);
  };

  const context = { signIn, signOut };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

import { createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getAuth as fbGetAuth,
  signInWithCustomToken as fbSignInWithCustomToken,
  signOut as fbSignOut,
} from 'firebase/auth';

interface FirebaseContextParams {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseContextParams>({
  signIn: () => new Promise(() => {}),
  signOut: () => new Promise(() => {}),
});

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const { loginWithPopup, logout, getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  const signIn = async () => {
    // login with auth0
    await loginWithPopup();
    // get the auth token
    const auth0Token = await getAccessTokenSilently();
    // get google creds
    const googleAuth = fbGetAuth();
    // use to sign in
    await fbSignInWithCustomToken(googleAuth, auth0Token);
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

import { AuthStateHook } from 'react-firebase-hooks/auth';

export interface FirebaseContextParams {
  signIn: { google: () => void };
  signOut: () => void;
  authUser: AuthStateHook['0'];
  authLoading: AuthStateHook['1'];
  authError: AuthStateHook['2'];
}

export interface FirebaseProviderProps {
  children: React.ReactNode;
}

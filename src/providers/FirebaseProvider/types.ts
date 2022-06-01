import { AuthStateHook } from 'react-firebase-hooks/auth';

export interface FirebaseContextParams {
  signIn: { google: () => Promise<void> };
  signOut: () => Promise<void>;
  authUser: AuthStateHook['0'];
  authLoading: AuthStateHook['1'];
  authError: AuthStateHook['2'];
  authorized: boolean;
  createCompany: () => Promise<void>;
}

export interface FirebaseProviderProps {
  children: React.ReactNode;
}

export enum FirebaseFunctions {
  CreateCompany = 'createCompany',
}

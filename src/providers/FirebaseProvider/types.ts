export interface FirebaseContextParams {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface FirebaseProviderProps {
  children: React.ReactNode;
}

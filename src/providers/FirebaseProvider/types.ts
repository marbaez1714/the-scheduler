export interface FirebaseContextParams {
  signIn: () => void;
  signOut: () => void;
}

export interface FirebaseProviderProps {
  children: React.ReactNode;
}

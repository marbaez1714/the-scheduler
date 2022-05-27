import { createContext } from 'react';

import { FirebaseContextParams, FirebaseProviderProps } from './types';

export const FirebaseContext = createContext<FirebaseContextParams>({
  signIn: () => {},
  signOut: () => {},
});

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const signIn = async () => {};

  const signOut = async () => {};

  const context = { signIn, signOut };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

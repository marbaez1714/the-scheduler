import { FirebaseContext } from './../providers/FirebaseProvider/FirebaseProvider';
import { useContext } from 'react';

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('Missing Firebase Context');
  }
  return context;
};

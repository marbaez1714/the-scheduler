import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

export const firebaseApp = fbInitializeApp(firebaseConfig);
export const firebaseAuth = fbGetAuth(firebaseApp);

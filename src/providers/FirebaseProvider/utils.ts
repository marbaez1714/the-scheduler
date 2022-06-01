import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';
import {
  getFunctions as fbGetFunctions,
  httpsCallable as fbHttpsCallable,
} from 'firebase/functions';
import { FirebaseFunctions } from './types';

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

// Create the Firebase app
export const firebaseApp = fbInitializeApp(firebaseConfig);

// Initialize the Firebase auth and functions
export const firebaseAuth = fbGetAuth(firebaseApp);
export const firebaseFunctions = fbGetFunctions(firebaseApp);

// Firebase Functions
export const createCompanyCallable = fbHttpsCallable(
  firebaseFunctions,
  FirebaseFunctions.CreateCompany
);

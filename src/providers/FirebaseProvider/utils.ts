import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';
import {
  getFunctions as fbGetFunctions,
  httpsCallable,
} from 'firebase/functions';
import { CallableFunctions } from './types';

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

// Initialize all of the firebase functions
export const callableFunctions: CallableFunctions = {
  getCompanyById: httpsCallable(firebaseFunctions, 'getCompanyById'),
  createCompany: httpsCallable(firebaseFunctions, 'createCompany'),
  updateCompany: httpsCallable(firebaseFunctions, 'updateCompany'),
  getCommunityById: httpsCallable(firebaseFunctions, 'getCommunityById'),
  createCommunity: httpsCallable(firebaseFunctions, 'createCommunity'),
  updateCommunity: httpsCallable(firebaseFunctions, 'updateCommunity'),
};

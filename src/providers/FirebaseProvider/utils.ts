import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';
import { getFunctions as fbGetFunctions, httpsCallable } from 'firebase/functions';
import { GetByIdPayload, GetByIdResponse, StoreDocumentNames } from 'src/utils/cloudFunctionTypes';
import { CallableFunctions } from './types';

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

// Create the Firebase app
const firebaseApp = fbInitializeApp(firebaseConfig);

// Initialize the Firebase auth and functions
const firebaseAuth = fbGetAuth(firebaseApp);
const firebaseFunctions = fbGetFunctions(firebaseApp);

// Creates get by id callable functions
const getByIdCallable =
  <T extends StoreDocumentNames>(collection: T) =>
  (id: string) => {
    return httpsCallable<GetByIdPayload, GetByIdResponse<T>>(firebaseFunctions, 'getById')({ collection, id });
  };

// Initialize all of the firebase functions
const callableFunctions: CallableFunctions = {
  // Collection Specific
  areaGetById: getByIdCallable('Area'),
  areaCreate: httpsCallable(firebaseFunctions, 'areaCreate'),

  builderGetById: getByIdCallable('Builder'),
  builderCreate: httpsCallable(firebaseFunctions, 'builderCreate'),

  communityGeyById: getByIdCallable('Community'),
  communityCreate: httpsCallable(firebaseFunctions, 'communityCreate'),

  companyGetById: getByIdCallable('Company'),
  companyCreate: httpsCallable(firebaseFunctions, 'companyCreate'),

  contractorGetById: getByIdCallable('Contractor'),
  contractorCreate: httpsCallable(firebaseFunctions, 'contractorCreate'),

  reporterGetById: getByIdCallable('Reporter'),
  reporterCreate: httpsCallable(firebaseFunctions, 'reporterCreate'),

  scopeGetById: getByIdCallable('Scope'),
  scopeCreate: httpsCallable(firebaseFunctions, 'scopeCreate'),

  supplierGetById: getByIdCallable('Supplier'),
  supplierCreate: httpsCallable(firebaseFunctions, 'supplierCreate'),

  jobLegacyGetById: getByIdCallable('JobLegacy'),
  jobLegacyCreate: httpsCallable(firebaseFunctions, 'jobLegacyCreate'),
};

export { firebaseApp, firebaseAuth, firebaseFunctions, callableFunctions };

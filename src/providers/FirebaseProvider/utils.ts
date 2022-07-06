import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';
import { getFunctions as fbGetFunctions, httpsCallable } from 'firebase/functions';
import {
  GetAllPayload,
  GetAllResponse,
  GetByIdPayload,
  GetByIdResponse,
  StoreDocumentNames,
} from 'src/utils/cloudFunctionTypes';
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

// Creates get all callable functions
const getAllCallable =
  <T extends StoreDocumentNames>(collection: T) =>
  () => {
    return httpsCallable<GetAllPayload, GetAllResponse<T>>(firebaseFunctions, 'getAll')({ collection });
  };

// Creates get by id callable functions
const getByIdCallable =
  <T extends StoreDocumentNames>(collection: T) =>
  (id: string) => {
    return httpsCallable<GetByIdPayload, GetByIdResponse<T>>(firebaseFunctions, 'getById')({ collection, id });
  };

// Initialize all of the firebase functions
const callableFunctions: CallableFunctions = {
  // Collection - GET ALL
  // Collection - GET BY ID
  // Collection - CREATE
  areaGetAll: getAllCallable('Area'),
  areaGetById: getByIdCallable('Area'),
  areaCreate: httpsCallable(firebaseFunctions, 'areaCreate'),

  builderGetAll: getAllCallable('Builder'),
  builderGetById: getByIdCallable('Builder'),
  builderCreate: httpsCallable(firebaseFunctions, 'builderCreate'),

  communityGetAll: getAllCallable('Community'),
  communityGeyById: getByIdCallable('Community'),
  communityCreate: httpsCallable(firebaseFunctions, 'communityCreate'),

  companyGetAll: getAllCallable('Company'),
  companyGetById: getByIdCallable('Company'),
  companyCreate: httpsCallable(firebaseFunctions, 'companyCreate'),

  contractorGetAll: getAllCallable('Contractor'),
  contractorGetById: getByIdCallable('Contractor'),
  contractorCreate: httpsCallable(firebaseFunctions, 'contractorCreate'),

  reporterGetAll: getAllCallable('Reporter'),
  reporterGetById: getByIdCallable('Reporter'),
  reporterCreate: httpsCallable(firebaseFunctions, 'reporterCreate'),

  scopeGetAll: getAllCallable('Scope'),
  scopeGetById: getByIdCallable('Scope'),
  scopeCreate: httpsCallable(firebaseFunctions, 'scopeCreate'),

  supplierGetAll: getAllCallable('Supplier'),
  supplierGetById: getByIdCallable('Supplier'),
  supplierCreate: httpsCallable(firebaseFunctions, 'supplierCreate'),

  jobLegacyGetAll: getAllCallable('JobLegacy'),
  jobLegacyGetById: getByIdCallable('JobLegacy'),
  jobLegacyCreate: httpsCallable(firebaseFunctions, 'jobLegacyCreate'),
};

export { firebaseApp, firebaseAuth, firebaseFunctions, callableFunctions };

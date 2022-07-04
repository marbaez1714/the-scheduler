import { initializeApp as fbInitializeApp } from 'firebase/app';
import { getAuth as fbGetAuth } from 'firebase/auth';
import {
  getFunctions as fbGetFunctions,
  httpsCallable,
} from 'firebase/functions';
import {
  GetAllPayload,
  GetAllResponse,
  GetByIdPayload,
  GetByIdResponse,
  StoreDocumentNames,
} from 'src/utils/firebase/types';
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
    return httpsCallable<GetAllPayload, GetAllResponse<T>>(
      firebaseFunctions,
      'getAll'
    )({ collection });
  };

// Creates get by id callable functions
const getByIdCallable =
  <T extends StoreDocumentNames>(collection: T) =>
  (id: string) => {
    return httpsCallable<GetByIdPayload, GetByIdResponse<T>>(
      firebaseFunctions,
      'getById'
    )({ collection, id });
  };

// Initialize all of the firebase functions
const callableFunctions: CallableFunctions = {
  // Collection - GET ALL
  // Collection - GET BY ID
  // Collection - CREATE
  // Collection - UPDATE
  areasGetAll: getAllCallable('Area'),
  areasGetById: getByIdCallable('Area'),
  areasCreate: httpsCallable(firebaseFunctions, 'areasCreate'),
  areasUpdate: httpsCallable(firebaseFunctions, 'areasUpdate'),

  buildersGetAll: getAllCallable('Builder'),
  buildersGetById: getByIdCallable('Builder'),
  buildersCreate: httpsCallable(firebaseFunctions, 'buildersCreate'),
  buildersUpdate: httpsCallable(firebaseFunctions, 'buildersUpdate'),

  communitiesGetAll: getAllCallable('Community'),
  communitiesGeyById: getByIdCallable('Community'),
  communitiesCreate: httpsCallable(firebaseFunctions, 'communitiesCreate'),
  communitiesUpdate: httpsCallable(firebaseFunctions, 'communitiesUpdate'),

  companiesGetAll: getAllCallable('Company'),
  companiesGetById: getByIdCallable('Company'),
  companiesCreate: httpsCallable(firebaseFunctions, 'companiesCreate'),
  companiesUpdate: httpsCallable(firebaseFunctions, 'companiesUpdate'),

  contractorsGetAll: getAllCallable('Contractor'),
  contractorsGetById: getByIdCallable('Contractor'),
  contractorsCreate: httpsCallable(firebaseFunctions, 'contractorsCreate'),
  contractorsUpdate: httpsCallable(firebaseFunctions, 'contractorsUpdate'),

  reportersGetAll: getAllCallable('Reporter'),
  reportersGetById: getByIdCallable('Reporter'),
  reportersCreate: httpsCallable(firebaseFunctions, 'reportersCreate'),
  reportersUpdate: httpsCallable(firebaseFunctions, 'reportersUpdate'),

  scopesGetAll: getAllCallable('Scope'),
  scopesGetById: getByIdCallable('Scope'),
  scopesCreate: httpsCallable(firebaseFunctions, 'scopesCreate'),
  scopesUpdate: httpsCallable(firebaseFunctions, 'scopesUpdate'),

  suppliersGetAll: getAllCallable('Supplier'),
  suppliersGetById: getByIdCallable('Supplier'),
  suppliersCreate: httpsCallable(firebaseFunctions, 'suppliersCreate'),
  suppliersUpdate: httpsCallable(firebaseFunctions, 'suppliersUpdate'),
};

export { firebaseApp, firebaseAuth, firebaseFunctions, callableFunctions };

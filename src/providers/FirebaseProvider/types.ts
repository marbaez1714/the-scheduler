import { HttpsCallable } from 'firebase/functions';
import { AuthStateHook } from 'react-firebase-hooks/auth';
import {
  CreatePayload,
  CreateResponse,
  GetAllPayload,
  GetAllResponse,
  GetByIdPayload,
  GetByIdResponse,
  StoreDocumentNames,
  UpdatePayload,
  UpdateResponse,
} from 'src/utils/firebase/types';

// -------------------------------- //
// ----- Cloud Function Types ----- //
// -------------------------------- //

interface Callable<T extends StoreDocumentNames> {
  GetAll: () => ReturnType<HttpsCallable<GetAllPayload, GetAllResponse<T>>>;
  GetById: (
    id: string
  ) => ReturnType<HttpsCallable<GetByIdPayload, GetByIdResponse<T>>>;
  Create: HttpsCallable<CreatePayload<T>, CreateResponse>;
  Update: HttpsCallable<UpdatePayload<T>, UpdateResponse>;
}

export interface CallableFunctions {
  areasGetAll: Callable<'Area'>['GetAll'];
  areasGetById: Callable<'Area'>['GetById'];
  areasCreate: Callable<'Area'>['Create'];
  areasUpdate: Callable<'Area'>['Update'];

  buildersGetAll: Callable<'Builder'>['GetAll'];
  buildersGetById: Callable<'Builder'>['GetById'];
  buildersCreate: Callable<'Builder'>['Create'];
  buildersUpdate: Callable<'Builder'>['Update'];

  communitiesGetAll: Callable<'Community'>['GetAll'];
  communitiesGeyById: Callable<'Community'>['GetById'];
  communitiesCreate: Callable<'Community'>['Create'];
  communitiesUpdate: Callable<'Community'>['Update'];

  contractorsGetAll: Callable<'Contractor'>['GetAll'];
  contractorsGetById: Callable<'Contractor'>['GetById'];
  contractorsCreate: Callable<'Contractor'>['Create'];
  contractorsUpdate: Callable<'Contractor'>['Update'];
  // contractorsUpdateAssignments

  companiesGetAll: Callable<'Company'>['GetAll'];
  companiesGetById: Callable<'Company'>['GetById'];
  companiesCreate: Callable<'Company'>['Create'];
  companiesUpdate: Callable<'Company'>['Update'];

  reportersGetAll: Callable<'Reporter'>['GetAll'];
  reportersGetById: Callable<'Reporter'>['GetById'];
  reportersCreate: Callable<'Reporter'>['Create'];
  reportersUpdate: Callable<'Reporter'>['Update'];

  scopesGetAll: Callable<'Scope'>['GetAll'];
  scopesGetById: Callable<'Scope'>['GetById'];
  scopesCreate: Callable<'Scope'>['Create'];
  scopesUpdate: Callable<'Scope'>['Update'];
}

// -------------------------- //
// ----- Provider Types ----- //
// -------------------------- //
export interface FirebaseContextParams extends CallableFunctions {
  signIn: { google: () => Promise<void> };
  signOut: () => Promise<void>;
  authState: {
    authorized: boolean;
    user: AuthStateHook['0'];
    loading: AuthStateHook['1'];
    error: AuthStateHook['2'];
  };
}

export interface FirebaseProviderProps {
  children: React.ReactNode;
}

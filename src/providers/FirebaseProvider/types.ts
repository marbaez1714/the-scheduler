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

type GetAllCallable<T extends StoreDocumentNames> = () => ReturnType<
  HttpsCallable<GetAllPayload, GetAllResponse<T>>
>;

type GetByIdCallable<T extends StoreDocumentNames> = (
  id: string
) => ReturnType<HttpsCallable<GetByIdPayload, GetByIdResponse<T>>>;

interface Callable<T extends StoreDocumentNames> {
  GetAll: GetAllCallable<T>;
  GetById: GetByIdCallable<T>;
  Create: HttpsCallable<CreatePayload<T>, CreateResponse>;
  Update: HttpsCallable<UpdatePayload<T>, UpdateResponse>;
}

interface CallableFunctions {
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
interface FirebaseContextParams extends CallableFunctions {
  signIn: { google: () => Promise<void> };
  signOut: () => Promise<void>;
  loading: boolean;
  authState: {
    authorized: boolean;
    user: AuthStateHook['0'];
    loading: AuthStateHook['1'];
    error: AuthStateHook['2'];
  };
  storeData: {
    areas?: GetAllResponse<'Area'>;
    builders?: GetAllResponse<'Builder'>;
    communities?: GetAllResponse<'Community'>;
    contractors?: GetAllResponse<'Contractor'>;
    companies?: GetAllResponse<'Company'>;
    reporters?: GetAllResponse<'Reporter'>;
    scopes?: GetAllResponse<'Scope'>;
  };
  refreshStoreData: {
    areas: () => Promise<void>;
    builders: () => Promise<void>;
    communities: () => Promise<void>;
    contractors: () => Promise<void>;
    companies: () => Promise<void>;
    reporters: () => Promise<void>;
    scopes: () => Promise<void>;
  };
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export type { CallableFunctions, FirebaseContextParams, FirebaseProviderProps };

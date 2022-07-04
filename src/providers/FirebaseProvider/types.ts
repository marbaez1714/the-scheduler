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
} from 'src/utils/cloudFunctionTypes';

// -------------------------------- //
// ----- Cloud Function Types ----- //
// -------------------------------- //

type GetAllCallable<T extends StoreDocumentNames> = () => ReturnType<HttpsCallable<GetAllPayload, GetAllResponse<T>>>;

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
  areaGetAll: Callable<'Area'>['GetAll'];
  areaGetById: Callable<'Area'>['GetById'];
  areaCreate: Callable<'Area'>['Create'];

  builderGetAll: Callable<'Builder'>['GetAll'];
  builderGetById: Callable<'Builder'>['GetById'];
  builderCreate: Callable<'Builder'>['Create'];

  communityGetAll: Callable<'Community'>['GetAll'];
  communityGeyById: Callable<'Community'>['GetById'];
  communityCreate: Callable<'Community'>['Create'];

  contractorGetAll: Callable<'Contractor'>['GetAll'];
  contractorGetById: Callable<'Contractor'>['GetById'];
  contractorCreate: Callable<'Contractor'>['Create'];

  companyGetAll: Callable<'Company'>['GetAll'];
  companyGetById: Callable<'Company'>['GetById'];
  companyCreate: Callable<'Company'>['Create'];

  reporterGetAll: Callable<'Reporter'>['GetAll'];
  reporterGetById: Callable<'Reporter'>['GetById'];
  reporterCreate: Callable<'Reporter'>['Create'];

  scopeGetAll: Callable<'Scope'>['GetAll'];
  scopeGetById: Callable<'Scope'>['GetById'];
  scopeCreate: Callable<'Scope'>['Create'];

  supplierGetAll: Callable<'Supplier'>['GetAll'];
  supplierGetById: Callable<'Supplier'>['GetById'];
  supplierCreate: Callable<'Supplier'>['Create'];
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
    suppliers?: GetAllResponse<'Supplier'>;
  };
  refreshStoreData: {
    areas: () => Promise<void>;
    builders: () => Promise<void>;
    communities: () => Promise<void>;
    contractors: () => Promise<void>;
    companies: () => Promise<void>;
    reporters: () => Promise<void>;
    scopes: () => Promise<void>;
    suppliers: () => Promise<void>;
  };
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export type { CallableFunctions, FirebaseContextParams, FirebaseProviderProps };

import { HttpsCallable } from 'firebase/functions';
import { AuthStateHook } from 'react-firebase-hooks/auth';
import {
  CreatePayload,
  CreateResponse,
  GetAllResponse,
  GetByIdPayload,
  GetByIdResponse,
  StoreDocumentNames,
} from 'src/utils/cloudFunctionTypes';

// -------------------------------- //
// ----- Cloud Function Types ----- //
// -------------------------------- //

type GetByIdCallable<T extends StoreDocumentNames> = (
  id: string
) => ReturnType<HttpsCallable<GetByIdPayload, GetByIdResponse<T>>>;

interface Callable<T extends StoreDocumentNames> {
  GetById: GetByIdCallable<T>;
  Create: HttpsCallable<CreatePayload[T], CreateResponse>;
}

interface CallableFunctions {
  // Collection Specific
  areaGetById: Callable<'Area'>['GetById'];
  areaCreate: Callable<'Area'>['Create'];

  builderGetById: Callable<'Builder'>['GetById'];
  builderCreate: Callable<'Builder'>['Create'];

  communityGeyById: Callable<'Community'>['GetById'];
  communityCreate: Callable<'Community'>['Create'];

  contractorGetById: Callable<'Contractor'>['GetById'];
  contractorCreate: Callable<'Contractor'>['Create'];

  companyGetById: Callable<'Company'>['GetById'];
  companyCreate: Callable<'Company'>['Create'];

  reporterGetById: Callable<'Reporter'>['GetById'];
  reporterCreate: Callable<'Reporter'>['Create'];

  scopeGetById: Callable<'Scope'>['GetById'];
  scopeCreate: Callable<'Scope'>['Create'];

  supplierGetById: Callable<'Supplier'>['GetById'];
  supplierCreate: Callable<'Supplier'>['Create'];

  jobLegacyGetById: Callable<'JobLegacy'>['GetById'];
  jobLegacyCreate: Callable<'JobLegacy'>['Create'];
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
  refreshStoreData: (collection: StoreDocumentNames) => Promise<void>;
  archiveStoreDocument: (collection: StoreDocumentNames, id: string) => Promise<void>;
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export type { CallableFunctions, FirebaseContextParams, FirebaseProviderProps };

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

interface CallableFunctions {
  // Collection Specific
  areaGetById: GetByIdCallable<'Area'>;
  areaCreate: HttpsCallable<CreatePayload['Area'], CreateResponse>;

  builderGetById: GetByIdCallable<'Builder'>;
  builderCreate: HttpsCallable<CreatePayload['Builder'], CreateResponse>;

  communityGeyById: GetByIdCallable<'Community'>;
  communityCreate: HttpsCallable<CreatePayload['Community'], CreateResponse>;

  contractorGetById: GetByIdCallable<'Contractor'>;
  contractorCreate: HttpsCallable<CreatePayload['Contractor'], CreateResponse>;

  companyGetById: GetByIdCallable<'Company'>;
  companyCreate: HttpsCallable<CreatePayload['Company'], CreateResponse>;

  reporterGetById: GetByIdCallable<'Reporter'>;
  reporterCreate: HttpsCallable<CreatePayload['Reporter'], CreateResponse>;

  scopeGetById: GetByIdCallable<'Scope'>;
  scopeCreate: HttpsCallable<CreatePayload['Scope'], CreateResponse>;

  supplierGetById: GetByIdCallable<'Supplier'>;
  supplierCreate: HttpsCallable<CreatePayload['Supplier'], CreateResponse>;

  jobLegacyGetById: GetByIdCallable<'JobLegacy'>;
  jobLegacyCreate: HttpsCallable<CreatePayload['JobLegacy'], CreateResponse>;
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

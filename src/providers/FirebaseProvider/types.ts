import { HttpsCallable } from 'firebase/functions';
import {
  CreatePayload,
  CreateResponse,
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

export interface CallableFunctions {
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

import { HttpsCallable } from 'firebase/functions';
import { AuthStateHook } from 'react-firebase-hooks/auth';
import {
  CreatePayloadTypes,
  CreateResponse,
  GetByIdPayload,
  GetByIdResponse,
  UpdatePayloadTypes,
  UpdateResponse,
} from 'src/utils/firebase/types';

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

// -------------------------------- //
// ----- Cloud Function Types ----- //
// -------------------------------- //

export type CallableFunctions = {
  // Company
  getCompanyById: HttpsCallable<GetByIdPayload, GetByIdResponse<'Company'>>;
  createCompany: HttpsCallable<CreatePayloadTypes<'Company'>, CreateResponse>;
  updateCompany: HttpsCallable<UpdatePayloadTypes<'Company'>, UpdateResponse>;
  // Community
  getCommunityById: HttpsCallable<GetByIdPayload, GetByIdResponse<'Community'>>;
  createCommunity: HttpsCallable<
    CreatePayloadTypes<'Community'>,
    CreateResponse
  >;
  updateCommunity: HttpsCallable<
    UpdatePayloadTypes<'Community'>,
    UpdateResponse
  >;
};

import { HttpsCallable } from 'firebase/functions';
import { AuthStateHook } from 'react-firebase-hooks/auth';
import {
  CreatePayloadTypes,
  GetByIdPayload,
  UpdatePayloadTypes,
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
  // General
  getById: HttpsCallable<GetByIdPayload>;
  // Company
  createCompany: HttpsCallable<CreatePayloadTypes<'Company'>>;
  updateCompany: HttpsCallable<UpdatePayloadTypes<'Company'>>;
  // Community
  createCommunity: HttpsCallable<CreatePayloadTypes<'Community'>>;
  updateCommunity: HttpsCallable<UpdatePayloadTypes<'Community'>>;
};

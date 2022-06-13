// COPY AND PASTED FROM FUNCTIONS //

// *********************** //
// ***** Collections ***** //
// *********************** //
export enum SchedulerCollections {
  Admin = 'admin',
  Companies = 'companies',
  Communities = 'communities',
}

// ************************ //
// ***** Shared Types ***** //
// ************************ //

// Document Meta
type UpdateMeta = {
  updatedBy: string;
  updatedTime: Record<string, any>;
};

type CreateMeta = UpdateMeta & {
  createdBy: string;
  createdTime: Record<string, any>;
};

// Documents
interface StoreDocumentTypes {
  Company: {
    name: string;
    notes?: string;
    primaryAddress?: string;
    primaryEmail?: string;
    primaryPhone?: string;
  };
  Community: {
    name: string;
    companyId: string;
    location: string;
    notes?: string;
  };
}

type StoreCreateDocument<T extends keyof StoreDocumentTypes> = CreateMeta &
  Required<StoreDocumentTypes[T]>;

type StoreUpdateDocument<T extends keyof StoreDocumentTypes> = UpdateMeta &
  Required<StoreDocumentTypes[T]>;

// General Payloads
type CreatePayloadTypes<T extends keyof StoreDocumentTypes> =
  StoreDocumentTypes[T];

type UpdatePayloadTypes<T extends keyof StoreDocumentTypes> = {
  id: string;
} & StoreDocumentTypes[T];

// Get Payloads
type GetByIdPayload = { id: string; collection: SchedulerCollections };

type GetCompaniesPayload = {
  orderBy?: string;
  lastRef?: string;
  pageSize?: number;
};
type GetCommunitiesPayload = {
  orderBy?: string;
  lastRef?: string;
  pageSize?: number;
  companyId?: string;
};

// Helper Functions

export type {
  GetByIdPayload,
  CreatePayloadTypes,
  UpdatePayloadTypes,
  GetCompaniesPayload,
  GetCommunitiesPayload,
};

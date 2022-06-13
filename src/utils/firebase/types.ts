// COPY AND PASTED FROM FUNCTIONS //

// *********************** //
// ***** Collections ***** //
// *********************** //
type CollectionNames = 'admin' | 'companies' | 'communities';

// *********************** //
// ****** Documents ****** //
// *********************** //
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

type StoreDocumentNames = keyof StoreDocumentTypes;

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

// General Documents
type StoreCreateDocument<T extends StoreDocumentNames> = CreateMeta &
  Required<StoreDocumentTypes[T]>;

type StoreUpdateDocument<T extends StoreDocumentNames> = UpdateMeta &
  Required<StoreDocumentTypes[T]>;

// General Payloads
type CreatePayloadTypes<T extends StoreDocumentNames> = StoreDocumentTypes[T];

type UpdatePayloadTypes<T extends StoreDocumentNames> = {
  id: string;
} & StoreDocumentTypes[T];

// Get Payloads
type GetByIdPayload = { id: string };

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

// Response Objects
type GetByIdResponse<T extends StoreDocumentNames> = {
  document: StoreCreateDocument<T>;
};

type GetResponse<T extends StoreDocumentNames> = {
  documents: StoreCreateDocument<T>[];
  size: number;
};

type CreateResponse = {
  message: string;
};

type UpdateResponse = {
  message: string;
};

export type {
  // Payloads
  GetByIdPayload,
  CreatePayloadTypes,
  UpdatePayloadTypes,
  GetCompaniesPayload,
  GetCommunitiesPayload,
  // Responses
  CreateResponse,
  UpdateResponse,
  GetByIdResponse,
  GetResponse,
};

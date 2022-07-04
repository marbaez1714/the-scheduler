// ***** Documents *****
type DocId = { id: string };

type LineItem = { orderNumber: string; supplierId: string };

interface StoreDocument {
  Area: {
    name: string;
    nameSpanish: string;
    notes: string;
  };
  Builder: {
    name: string;
    primaryPhone: string;
    primaryEmail: string;
    companyId: string;
    notes: string;
  };
  Community: {
    name: string;
    companyId: string;
    notes: string;
  };
  Company: {
    name: string;
    primaryAddress: string;
    primaryEmail: string;
    primaryPhone: string;
    notes: string;
  };
  Contractor: {
    name: string;
    primaryPhone: string;
    notes: string;
  };
  JobLegacy: {
    name: string;
    areaId: string;
    builderId: string;
    communityId: string;
    contractorId: string;
    lineItems: LineItem[];
    reporterId: string;
    scopeId: string;
    completedDate: string;
    startDate: string;
    notes: string;
    active: boolean;
    inProgress: boolean;
    isImportant: boolean;
  };
  Reporter: {
    name: string;
    primaryPhone: string;
    primaryEmail: string;
    notes: string;
  };
  Scope: {
    name: string;
    nameSpanish: string;
    description: string;
    notes: string;
  };
  Supplier: {
    name: string;
    phoneNumber: string;
    notes: string;
  };
}

type StoreDocumentNames = keyof StoreDocument;

// Meta Data Fields
type CreateMeta = {
  updatedBy: string;
  updatedTime: any;
  createdBy: string;
  createdTime: any;
};

type UpdateMeta = Omit<CreateMeta, 'createdBy' | 'createdTime'>;

// ***** Create / Update - Documents *****
type NewDocumentData<T extends StoreDocumentNames> = CreateMeta & Required<StoreDocument[T]>;

type UpdatedDocumentData<T extends StoreDocumentNames> = UpdateMeta & Partial<StoreDocument[T]>;

// ***** PAYLOADS *****

// Params
type PaginationParams = {
  orderBy?: string;
  lastRef?: string;
  pageSize?: number;
};

// Get by ID
type GetByIdPayload = { collection: StoreDocumentNames; id: string };

// Get all
type GetAllPayload = { collection: StoreDocumentNames };

// Create
type CreatePayload<T extends StoreDocumentNames> = Partial<StoreDocument[T]>;

// Update
type UpdatePayload<T extends StoreDocumentNames> = Partial<DocId & StoreDocument[T]>;

// Get Paginated
interface GetPayload {
  Companies: PaginationParams;
  Communities: PaginationParams & {
    companyId?: StoreDocument['Community']['companyId'];
  };
  Scopes: PaginationParams;
  Reporters: PaginationParams;
  Contractors: PaginationParams;
}

// Response Objects
type ResponseDocument<T extends StoreDocumentNames> = {
  id: string;
} & StoreDocument[T];

type GetByIdResponse<T extends StoreDocumentNames> = {
  document: ResponseDocument<T>;
};

type GetAllResponse<T extends StoreDocumentNames> = {
  documents: ResponseDocument<T>[];
  size: number;
};

type GetResponse<T extends StoreDocumentNames> = {
  documents: ResponseDocument<T>[];
  lastRef: string | number;
  size: number;
};

type CreateResponse = {
  message: string;
};

type UpdateResponse = {
  message: string;
};

export type {
  // Documents
  LineItem,
  StoreDocument,
  StoreDocumentNames,
  NewDocumentData,
  UpdatedDocumentData,
  ResponseDocument,
  // Create / Update Payloads
  CreatePayload,
  UpdatePayload,
  // Get Payloads
  GetByIdPayload,
  GetAllPayload,
  GetPayload,
  // Create / Update Responses
  CreateResponse,
  UpdateResponse,
  // Get Responses
  GetByIdResponse,
  GetAllResponse,
  GetResponse,
  // General
  PaginationParams,
};

import { Timestamp } from 'firebase/firestore';

// ***** Documents *****
export type DocId = { id: string };

export type LineItem = { orderNumber: string; supplierId: string };

export interface StoreDocument {
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
    completedDate: Timestamp | null;
    startDate: Timestamp | null;
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
    primaryPhone: string;
    notes: string;
  };
}

export type StoreDocumentNames = keyof StoreDocument;

export type PartialDocument<T extends StoreDocumentNames> = Partial<StoreDocument[T]>;

// Meta Data Fields
export type CreateMeta = {
  updatedBy: string;
  updatedTime: Timestamp;
  createdBy: string;
  createdTime: Timestamp;
  archived?: boolean;
  legacy?: boolean;
};

export type UpdateMeta = Omit<CreateMeta, 'createdBy' | 'createdTime' | 'archived' | 'legacy'>;

// ***** Create / Update - Documents *****
export type NewDocumentData<T extends StoreDocumentNames> = CreateMeta & Required<StoreDocument[T]>;

// ***** PAYLOADS *****

// Params
export type PaginationParams = {
  orderBy?: string;
  lastRef?: string;
  pageSize?: number;
};

// Get by ID
export type GetByIdPayload = { collection: StoreDocumentNames; id: string };

// Get all
export type GetAllPayload = { collection: StoreDocumentNames; status?: 'all' | 'active' | 'archived' };

// Archive document

export type ArchiveDocumentPayload = { collection: StoreDocumentNames; id: string };

// Create
export interface CreatePayload {
  Area: PartialDocument<'Area'>;
  Builder: PartialDocument<'Builder'>;
  Community: PartialDocument<'Community'>;
  Company: PartialDocument<'Company'>;
  Contractor: PartialDocument<'Contractor'>;
  Reporter: PartialDocument<'Reporter'>;
  Scope: PartialDocument<'Scope'>;
  Supplier: PartialDocument<'Supplier'>;
  JobLegacy: Omit<
    PartialDocument<'JobLegacy'>,
    'completedDate' | 'startDate' | 'active' | 'inProgress' | 'isImportant'
  > & { startDate?: number };
}

// Update
export type UpdatePayload<T extends StoreDocumentNames> = Partial<DocId & StoreDocument[T]>;

// Get Paginated
export interface GetPayload {
  Companies: PaginationParams;
  Communities: PaginationParams & {
    companyId?: StoreDocument['Community']['companyId'];
  };
  Scopes: PaginationParams;
  Reporters: PaginationParams;
  Contractors: PaginationParams;
}

// Response Objects
export type ResponseDocument<T extends StoreDocumentNames> = {
  id: string;
} & StoreDocument[T] &
  CreateMeta;

export type GetByIdResponse<T extends StoreDocumentNames> = {
  document: ResponseDocument<T>;
};

export type GetAllResponse<T extends StoreDocumentNames> = {
  documents: ResponseDocument<T>[];
  size: number;
};

export type GetResponse<T extends StoreDocumentNames> = {
  documents: ResponseDocument<T>[];
  lastRef: string | number;
  size: number;
};

export type CreateResponse = {
  message: string;
};

export type ArchiveResponse = {
  message: string;
};

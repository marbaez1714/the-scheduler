import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Area = {
  __typename?: 'Area';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type AreasResponse = {
  __typename?: 'AreasResponse';
  data: Array<Area>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type Builder = {
  __typename?: 'Builder';
  archived: Scalars['Boolean'];
  company: Company;
  companyId: Scalars['String'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type BuildersResponse = {
  __typename?: 'BuildersResponse';
  data: Array<Builder>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type CommunitiesResponse = {
  __typename?: 'CommunitiesResponse';
  data: Array<Community>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type Community = {
  __typename?: 'Community';
  archived: Scalars['Boolean'];
  company: Company;
  companyId: Scalars['String'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type CompaniesResponse = {
  __typename?: 'CompaniesResponse';
  data: Array<Company>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type Company = {
  __typename?: 'Company';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryAddress?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type Contractor = {
  __typename?: 'Contractor';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  jobsLegacy: Array<JobLegacy>;
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ContractorsResponse = {
  __typename?: 'ContractorsResponse';
  data: Array<Contractor>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type CreateAreaInput = {
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateBuilderInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateCommunityInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryAddress?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type CreateContractorInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateJobLegacyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  builderId?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
  contractorId?: InputMaybe<Scalars['String']>;
  lineItems: Array<LineItemLegacyInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  reporterId?: InputMaybe<Scalars['String']>;
  scopeId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type CreateReporterInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateScopeInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateSupplierInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type JobLegacy = {
  __typename?: 'JobLegacy';
  active: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  builder?: Maybe<Builder>;
  builderId?: Maybe<Scalars['String']>;
  community?: Maybe<Community>;
  communityId?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['String']>;
  contractor?: Maybe<Contractor>;
  contractorId?: Maybe<Scalars['String']>;
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  inProgress: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  legacy: Scalars['Boolean'];
  lineItems: Array<LineItemLegacy>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  reporter?: Maybe<Reporter>;
  reporterId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  scopeId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type LineItemLegacy = {
  __typename?: 'LineItemLegacy';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  jobId: Scalars['String'];
  legacy: Scalars['Boolean'];
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type LineItemLegacyInput = {
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveArea: MessageResponse;
  archiveBuilder: MessageResponse;
  archiveCommunity: MessageResponse;
  archiveCompany: MessageResponse;
  archiveContractor: MessageResponse;
  archiveJobLegacy: MessageResponse;
  archiveReporter: MessageResponse;
  archiveScope: MessageResponse;
  archiveSupplier: MessageResponse;
  createArea: MessageResponse;
  createBuilder: MessageResponse;
  createCommunity: MessageResponse;
  createCompany: MessageResponse;
  createContractor: MessageResponse;
  createJobLegacy: MessageResponse;
  createReporter: MessageResponse;
  createScope: MessageResponse;
  createSupplier: MessageResponse;
  deleteLineItemLegacy: MessageResponse;
  updateArea: MessageResponse;
  updateBuilder: MessageResponse;
  updateCommunity: MessageResponse;
  updateCompany: MessageResponse;
  updateContactor: MessageResponse;
};

export type MutationArchiveAreaArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveBuilderArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveCommunityArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveCompanyArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveContractorArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveJobLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveReporterArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveScopeArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveSupplierArgs = {
  id: Scalars['ID'];
};

export type MutationCreateAreaArgs = {
  data: CreateAreaInput;
};

export type MutationCreateBuilderArgs = {
  data: CreateBuilderInput;
};

export type MutationCreateCommunityArgs = {
  data: CreateCommunityInput;
};

export type MutationCreateCompanyArgs = {
  data: CreateCompanyInput;
};

export type MutationCreateContractorArgs = {
  data: CreateContractorInput;
};

export type MutationCreateJobLegacyArgs = {
  data: CreateJobLegacyInput;
};

export type MutationCreateReporterArgs = {
  data: CreateReporterInput;
};

export type MutationCreateScopeArgs = {
  data: CreateScopeInput;
};

export type MutationCreateSupplierArgs = {
  data: CreateSupplierInput;
};

export type MutationDeleteLineItemLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateAreaArgs = {
  data: UpdateAreaInput;
  id: Scalars['ID'];
};

export type MutationUpdateBuilderArgs = {
  data: UpdateBuilderInput;
  id: Scalars['ID'];
};

export type MutationUpdateCommunityArgs = {
  data: UpdateCommunityInput;
  id: Scalars['ID'];
};

export type MutationUpdateCompanyArgs = {
  data: UpdateCompanyInput;
  id: Scalars['ID'];
};

export type MutationUpdateContactorArgs = {
  data: UpdateContractorInput;
  id: Scalars['ID'];
};

export type PaginationOptions = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areas: AreasResponse;
  builderById?: Maybe<Builder>;
  builders: BuildersResponse;
  communities: CommunitiesResponse;
  communityById?: Maybe<Community>;
  companies: CompaniesResponse;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractors: ContractorsResponse;
  jobLegacyById?: Maybe<JobLegacy>;
  reporterById?: Maybe<Reporter>;
  reporters: ReportersResponse;
  scopeById?: Maybe<Scope>;
  scopes: ScopesResponse;
  supplierById?: Maybe<Supplier>;
  suppliers: SuppliersResponse;
};

export type QueryAreaByIdArgs = {
  id: Scalars['ID'];
};

export type QueryAreasArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryBuilderByIdArgs = {
  id: Scalars['ID'];
};

export type QueryBuildersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCommunitiesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};

export type QueryCompaniesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCompanyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorsArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryJobLegacyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReporterByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReportersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryScopeByIdArgs = {
  id: Scalars['ID'];
};

export type QueryScopesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QuerySupplierByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySuppliersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryOptions = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<PaginationOptions>;
  sorting?: InputMaybe<SortingOptions>;
};

export type Reporter = {
  __typename?: 'Reporter';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ReportersResponse = {
  __typename?: 'ReportersResponse';
  data: Array<Reporter>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type Scope = {
  __typename?: 'Scope';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ScopesResponse = {
  __typename?: 'ScopesResponse';
  data: Array<Scope>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortingOptions = {
  field: Scalars['String'];
  order: SortOrder;
};

export type SortingResponse = {
  __typename?: 'SortingResponse';
  field: Scalars['String'];
  order: SortOrder;
};

export type Supplier = {
  __typename?: 'Supplier';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type SuppliersResponse = {
  __typename?: 'SuppliersResponse';
  data: Array<Supplier>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type UpdateAreaInput = {
  name?: InputMaybe<Scalars['String']>;
  nameSpanish?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateBuilderInput = {
  companyId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type UpdateCommunityInput = {
  companyId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryAddress?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type UpdateContractorInput = {
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type ArchiveAreaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveAreaMutation = {
  __typename?: 'Mutation';
  archiveArea: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveBuilderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveBuilderMutation = {
  __typename?: 'Mutation';
  archiveBuilder: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveCommunityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveCommunityMutation = {
  __typename?: 'Mutation';
  archiveCommunity: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveCompanyMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveCompanyMutation = {
  __typename?: 'Mutation';
  archiveCompany: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveContractorMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveContractorMutation = {
  __typename?: 'Mutation';
  archiveContractor: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveReporterMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveReporterMutation = {
  __typename?: 'Mutation';
  archiveReporter: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveScopeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveScopeMutation = {
  __typename?: 'Mutation';
  archiveScope: { __typename?: 'MessageResponse'; message: string };
};

export type ArchiveSupplierMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ArchiveSupplierMutation = {
  __typename?: 'Mutation';
  archiveSupplier: { __typename?: 'MessageResponse'; message: string };
};

export type CreateAreaMutationVariables = Exact<{
  data: CreateAreaInput;
}>;

export type CreateAreaMutation = {
  __typename?: 'Mutation';
  createArea: { __typename?: 'MessageResponse'; message: string };
};

export type CreateBuilderMutationVariables = Exact<{
  data: CreateBuilderInput;
}>;

export type CreateBuilderMutation = {
  __typename?: 'Mutation';
  createBuilder: { __typename?: 'MessageResponse'; message: string };
};

export type CreateJobLegacyMutationVariables = Exact<{
  data: CreateJobLegacyInput;
}>;

export type CreateJobLegacyMutation = {
  __typename?: 'Mutation';
  createJobLegacy: { __typename?: 'MessageResponse'; message: string };
};

export type CreateCommunityMutationVariables = Exact<{
  data: CreateCommunityInput;
}>;

export type CreateCommunityMutation = {
  __typename?: 'Mutation';
  createCommunity: { __typename?: 'MessageResponse'; message: string };
};

export type CreateCompanyMutationVariables = Exact<{
  data: CreateCompanyInput;
}>;

export type CreateCompanyMutation = {
  __typename?: 'Mutation';
  createCompany: { __typename?: 'MessageResponse'; message: string };
};

export type CreateContractorMutationVariables = Exact<{
  data: CreateContractorInput;
}>;

export type CreateContractorMutation = {
  __typename?: 'Mutation';
  createContractor: { __typename?: 'MessageResponse'; message: string };
};

export type CreateReporterMutationVariables = Exact<{
  data: CreateReporterInput;
}>;

export type CreateReporterMutation = {
  __typename?: 'Mutation';
  createReporter: { __typename?: 'MessageResponse'; message: string };
};

export type CreateScopeMutationVariables = Exact<{
  data: CreateScopeInput;
}>;

export type CreateScopeMutation = {
  __typename?: 'Mutation';
  createScope: { __typename?: 'MessageResponse'; message: string };
};

export type CreateSupplierMutationVariables = Exact<{
  data: CreateSupplierInput;
}>;

export type CreateSupplierMutation = {
  __typename?: 'Mutation';
  createSupplier: { __typename?: 'MessageResponse'; message: string };
};

export type GetAreasQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetAreasQuery = {
  __typename?: 'Query';
  areas: {
    __typename?: 'AreasResponse';
    data: Array<{
      __typename?: 'Area';
      id: string;
      name: string;
      nameSpanish: string;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetBuildersQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetBuildersQuery = {
  __typename?: 'Query';
  builders: {
    __typename?: 'BuildersResponse';
    data: Array<{
      __typename?: 'Builder';
      id: string;
      name: string;
      primaryPhone?: string | null;
      primaryEmail?: string | null;
      companyId: string;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
      company: { __typename?: 'Company'; name: string };
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetCommunitiesQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetCommunitiesQuery = {
  __typename?: 'Query';
  communities: {
    __typename?: 'CommunitiesResponse';
    data: Array<{
      __typename?: 'Community';
      id: string;
      name: string;
      companyId: string;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
      company: { __typename?: 'Company'; name: string };
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetCompaniesQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetCompaniesQuery = {
  __typename?: 'Query';
  companies: {
    __typename?: 'CompaniesResponse';
    data: Array<{
      __typename?: 'Company';
      id: string;
      name: string;
      primaryAddress?: string | null;
      primaryEmail?: string | null;
      primaryPhone?: string | null;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetContractorsQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetContractorsQuery = {
  __typename?: 'Query';
  contractors: {
    __typename?: 'ContractorsResponse';
    data: Array<{
      __typename?: 'Contractor';
      id: string;
      name: string;
      primaryPhone: string;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetReportersQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetReportersQuery = {
  __typename?: 'Query';
  reporters: {
    __typename?: 'ReportersResponse';
    data: Array<{
      __typename?: 'Reporter';
      id: string;
      name: string;
      primaryPhone: string;
      primaryEmail?: string | null;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetScopesQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetScopesQuery = {
  __typename?: 'Query';
  scopes: {
    __typename?: 'ScopesResponse';
    data: Array<{
      __typename?: 'Scope';
      id: string;
      name: string;
      nameSpanish: string;
      description?: string | null;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetSuppliersQueryVariables = Exact<{
  options?: InputMaybe<QueryOptions>;
}>;

export type GetSuppliersQuery = {
  __typename?: 'Query';
  suppliers: {
    __typename?: 'SuppliersResponse';
    data: Array<{
      __typename?: 'Supplier';
      id: string;
      name: string;
      primaryPhone?: string | null;
      notes?: string | null;
      updatedBy: string;
      createdBy: string;
      createdTime: string;
      updatedTime: string;
      archived: boolean;
      legacy: boolean;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page?: number | null;
      pageSize?: number | null;
      totalCount: number;
    };
    sorting?: { __typename?: 'SortingResponse'; field: string; order: SortOrder } | null;
  };
};

export type GetOptionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetOptionsQuery = {
  __typename?: 'Query';
  areas: { __typename?: 'AreasResponse'; data: Array<{ __typename?: 'Area'; id: string; name: string }> };
  builders: { __typename?: 'BuildersResponse'; data: Array<{ __typename?: 'Builder'; id: string; name: string }> };
  communities: {
    __typename?: 'CommunitiesResponse';
    data: Array<{ __typename?: 'Community'; id: string; name: string }>;
  };
  companies: { __typename?: 'CompaniesResponse'; data: Array<{ __typename?: 'Company'; id: string; name: string }> };
  contractors: {
    __typename?: 'ContractorsResponse';
    data: Array<{ __typename?: 'Contractor'; id: string; name: string }>;
  };
  reporters: { __typename?: 'ReportersResponse'; data: Array<{ __typename?: 'Reporter'; id: string; name: string }> };
  scopes: { __typename?: 'ScopesResponse'; data: Array<{ __typename?: 'Scope'; id: string; name: string }> };
  suppliers: { __typename?: 'SuppliersResponse'; data: Array<{ __typename?: 'Supplier'; id: string; name: string }> };
};

export const ArchiveAreaDocument = gql`
  mutation ArchiveArea($id: ID!) {
    archiveArea(id: $id) {
      message
    }
  }
`;
export type ArchiveAreaMutationFn = Apollo.MutationFunction<ArchiveAreaMutation, ArchiveAreaMutationVariables>;

/**
 * __useArchiveAreaMutation__
 *
 * To run a mutation, you first call `useArchiveAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveAreaMutation, { data, loading, error }] = useArchiveAreaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveAreaMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveAreaMutation, ArchiveAreaMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveAreaMutation, ArchiveAreaMutationVariables>(ArchiveAreaDocument, options);
}
export type ArchiveAreaMutationHookResult = ReturnType<typeof useArchiveAreaMutation>;
export type ArchiveAreaMutationResult = Apollo.MutationResult<ArchiveAreaMutation>;
export type ArchiveAreaMutationOptions = Apollo.BaseMutationOptions<ArchiveAreaMutation, ArchiveAreaMutationVariables>;
export const ArchiveBuilderDocument = gql`
  mutation ArchiveBuilder($id: ID!) {
    archiveBuilder(id: $id) {
      message
    }
  }
`;
export type ArchiveBuilderMutationFn = Apollo.MutationFunction<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>;

/**
 * __useArchiveBuilderMutation__
 *
 * To run a mutation, you first call `useArchiveBuilderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveBuilderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveBuilderMutation, { data, loading, error }] = useArchiveBuilderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveBuilderMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>(ArchiveBuilderDocument, options);
}
export type ArchiveBuilderMutationHookResult = ReturnType<typeof useArchiveBuilderMutation>;
export type ArchiveBuilderMutationResult = Apollo.MutationResult<ArchiveBuilderMutation>;
export type ArchiveBuilderMutationOptions = Apollo.BaseMutationOptions<
  ArchiveBuilderMutation,
  ArchiveBuilderMutationVariables
>;
export const ArchiveCommunityDocument = gql`
  mutation ArchiveCommunity($id: ID!) {
    archiveCommunity(id: $id) {
      message
    }
  }
`;
export type ArchiveCommunityMutationFn = Apollo.MutationFunction<
  ArchiveCommunityMutation,
  ArchiveCommunityMutationVariables
>;

/**
 * __useArchiveCommunityMutation__
 *
 * To run a mutation, you first call `useArchiveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCommunityMutation, { data, loading, error }] = useArchiveCommunityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveCommunityMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>(
    ArchiveCommunityDocument,
    options
  );
}
export type ArchiveCommunityMutationHookResult = ReturnType<typeof useArchiveCommunityMutation>;
export type ArchiveCommunityMutationResult = Apollo.MutationResult<ArchiveCommunityMutation>;
export type ArchiveCommunityMutationOptions = Apollo.BaseMutationOptions<
  ArchiveCommunityMutation,
  ArchiveCommunityMutationVariables
>;
export const ArchiveCompanyDocument = gql`
  mutation ArchiveCompany($id: ID!) {
    archiveCompany(id: $id) {
      message
    }
  }
`;
export type ArchiveCompanyMutationFn = Apollo.MutationFunction<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>;

/**
 * __useArchiveCompanyMutation__
 *
 * To run a mutation, you first call `useArchiveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCompanyMutation, { data, loading, error }] = useArchiveCompanyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>(ArchiveCompanyDocument, options);
}
export type ArchiveCompanyMutationHookResult = ReturnType<typeof useArchiveCompanyMutation>;
export type ArchiveCompanyMutationResult = Apollo.MutationResult<ArchiveCompanyMutation>;
export type ArchiveCompanyMutationOptions = Apollo.BaseMutationOptions<
  ArchiveCompanyMutation,
  ArchiveCompanyMutationVariables
>;
export const ArchiveContractorDocument = gql`
  mutation ArchiveContractor($id: ID!) {
    archiveContractor(id: $id) {
      message
    }
  }
`;
export type ArchiveContractorMutationFn = Apollo.MutationFunction<
  ArchiveContractorMutation,
  ArchiveContractorMutationVariables
>;

/**
 * __useArchiveContractorMutation__
 *
 * To run a mutation, you first call `useArchiveContractorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveContractorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveContractorMutation, { data, loading, error }] = useArchiveContractorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveContractorMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveContractorMutation, ArchiveContractorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveContractorMutation, ArchiveContractorMutationVariables>(
    ArchiveContractorDocument,
    options
  );
}
export type ArchiveContractorMutationHookResult = ReturnType<typeof useArchiveContractorMutation>;
export type ArchiveContractorMutationResult = Apollo.MutationResult<ArchiveContractorMutation>;
export type ArchiveContractorMutationOptions = Apollo.BaseMutationOptions<
  ArchiveContractorMutation,
  ArchiveContractorMutationVariables
>;
export const ArchiveReporterDocument = gql`
  mutation ArchiveReporter($id: ID!) {
    archiveReporter(id: $id) {
      message
    }
  }
`;
export type ArchiveReporterMutationFn = Apollo.MutationFunction<
  ArchiveReporterMutation,
  ArchiveReporterMutationVariables
>;

/**
 * __useArchiveReporterMutation__
 *
 * To run a mutation, you first call `useArchiveReporterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveReporterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveReporterMutation, { data, loading, error }] = useArchiveReporterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveReporterMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveReporterMutation, ArchiveReporterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveReporterMutation, ArchiveReporterMutationVariables>(
    ArchiveReporterDocument,
    options
  );
}
export type ArchiveReporterMutationHookResult = ReturnType<typeof useArchiveReporterMutation>;
export type ArchiveReporterMutationResult = Apollo.MutationResult<ArchiveReporterMutation>;
export type ArchiveReporterMutationOptions = Apollo.BaseMutationOptions<
  ArchiveReporterMutation,
  ArchiveReporterMutationVariables
>;
export const ArchiveScopeDocument = gql`
  mutation ArchiveScope($id: ID!) {
    archiveScope(id: $id) {
      message
    }
  }
`;
export type ArchiveScopeMutationFn = Apollo.MutationFunction<ArchiveScopeMutation, ArchiveScopeMutationVariables>;

/**
 * __useArchiveScopeMutation__
 *
 * To run a mutation, you first call `useArchiveScopeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveScopeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveScopeMutation, { data, loading, error }] = useArchiveScopeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveScopeMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveScopeMutation, ArchiveScopeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveScopeMutation, ArchiveScopeMutationVariables>(ArchiveScopeDocument, options);
}
export type ArchiveScopeMutationHookResult = ReturnType<typeof useArchiveScopeMutation>;
export type ArchiveScopeMutationResult = Apollo.MutationResult<ArchiveScopeMutation>;
export type ArchiveScopeMutationOptions = Apollo.BaseMutationOptions<
  ArchiveScopeMutation,
  ArchiveScopeMutationVariables
>;
export const ArchiveSupplierDocument = gql`
  mutation ArchiveSupplier($id: ID!) {
    archiveSupplier(id: $id) {
      message
    }
  }
`;
export type ArchiveSupplierMutationFn = Apollo.MutationFunction<
  ArchiveSupplierMutation,
  ArchiveSupplierMutationVariables
>;

/**
 * __useArchiveSupplierMutation__
 *
 * To run a mutation, you first call `useArchiveSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSupplierMutation, { data, loading, error }] = useArchiveSupplierMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveSupplierMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>(
    ArchiveSupplierDocument,
    options
  );
}
export type ArchiveSupplierMutationHookResult = ReturnType<typeof useArchiveSupplierMutation>;
export type ArchiveSupplierMutationResult = Apollo.MutationResult<ArchiveSupplierMutation>;
export type ArchiveSupplierMutationOptions = Apollo.BaseMutationOptions<
  ArchiveSupplierMutation,
  ArchiveSupplierMutationVariables
>;
export const CreateAreaDocument = gql`
  mutation CreateArea($data: CreateAreaInput!) {
    createArea(data: $data) {
      message
    }
  }
`;
export type CreateAreaMutationFn = Apollo.MutationFunction<CreateAreaMutation, CreateAreaMutationVariables>;

/**
 * __useCreateAreaMutation__
 *
 * To run a mutation, you first call `useCreateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAreaMutation, { data, loading, error }] = useCreateAreaMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAreaMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAreaMutation, CreateAreaMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAreaMutation, CreateAreaMutationVariables>(CreateAreaDocument, options);
}
export type CreateAreaMutationHookResult = ReturnType<typeof useCreateAreaMutation>;
export type CreateAreaMutationResult = Apollo.MutationResult<CreateAreaMutation>;
export type CreateAreaMutationOptions = Apollo.BaseMutationOptions<CreateAreaMutation, CreateAreaMutationVariables>;
export const CreateBuilderDocument = gql`
  mutation CreateBuilder($data: CreateBuilderInput!) {
    createBuilder(data: $data) {
      message
    }
  }
`;
export type CreateBuilderMutationFn = Apollo.MutationFunction<CreateBuilderMutation, CreateBuilderMutationVariables>;

/**
 * __useCreateBuilderMutation__
 *
 * To run a mutation, you first call `useCreateBuilderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBuilderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBuilderMutation, { data, loading, error }] = useCreateBuilderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBuilderMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBuilderMutation, CreateBuilderMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBuilderMutation, CreateBuilderMutationVariables>(CreateBuilderDocument, options);
}
export type CreateBuilderMutationHookResult = ReturnType<typeof useCreateBuilderMutation>;
export type CreateBuilderMutationResult = Apollo.MutationResult<CreateBuilderMutation>;
export type CreateBuilderMutationOptions = Apollo.BaseMutationOptions<
  CreateBuilderMutation,
  CreateBuilderMutationVariables
>;
export const CreateJobLegacyDocument = gql`
  mutation CreateJobLegacy($data: CreateJobLegacyInput!) {
    createJobLegacy(data: $data) {
      message
    }
  }
`;
export type CreateJobLegacyMutationFn = Apollo.MutationFunction<
  CreateJobLegacyMutation,
  CreateJobLegacyMutationVariables
>;

/**
 * __useCreateJobLegacyMutation__
 *
 * To run a mutation, you first call `useCreateJobLegacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobLegacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobLegacyMutation, { data, loading, error }] = useCreateJobLegacyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateJobLegacyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateJobLegacyMutation, CreateJobLegacyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateJobLegacyMutation, CreateJobLegacyMutationVariables>(
    CreateJobLegacyDocument,
    options
  );
}
export type CreateJobLegacyMutationHookResult = ReturnType<typeof useCreateJobLegacyMutation>;
export type CreateJobLegacyMutationResult = Apollo.MutationResult<CreateJobLegacyMutation>;
export type CreateJobLegacyMutationOptions = Apollo.BaseMutationOptions<
  CreateJobLegacyMutation,
  CreateJobLegacyMutationVariables
>;
export const CreateCommunityDocument = gql`
  mutation CreateCommunity($data: CreateCommunityInput!) {
    createCommunity(data: $data) {
      message
    }
  }
`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<
  CreateCommunityMutation,
  CreateCommunityMutationVariables
>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommunityMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(
    CreateCommunityDocument,
    options
  );
}
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<
  CreateCommunityMutation,
  CreateCommunityMutationVariables
>;
export const CreateCompanyDocument = gql`
  mutation CreateCompany($data: CreateCompanyInput!) {
    createCompany(data: $data) {
      message
    }
  }
`;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
}
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>;
export const CreateContractorDocument = gql`
  mutation CreateContractor($data: CreateContractorInput!) {
    createContractor(data: $data) {
      message
    }
  }
`;
export type CreateContractorMutationFn = Apollo.MutationFunction<
  CreateContractorMutation,
  CreateContractorMutationVariables
>;

/**
 * __useCreateContractorMutation__
 *
 * To run a mutation, you first call `useCreateContractorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContractorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContractorMutation, { data, loading, error }] = useCreateContractorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateContractorMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateContractorMutation, CreateContractorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateContractorMutation, CreateContractorMutationVariables>(
    CreateContractorDocument,
    options
  );
}
export type CreateContractorMutationHookResult = ReturnType<typeof useCreateContractorMutation>;
export type CreateContractorMutationResult = Apollo.MutationResult<CreateContractorMutation>;
export type CreateContractorMutationOptions = Apollo.BaseMutationOptions<
  CreateContractorMutation,
  CreateContractorMutationVariables
>;
export const CreateReporterDocument = gql`
  mutation CreateReporter($data: CreateReporterInput!) {
    createReporter(data: $data) {
      message
    }
  }
`;
export type CreateReporterMutationFn = Apollo.MutationFunction<CreateReporterMutation, CreateReporterMutationVariables>;

/**
 * __useCreateReporterMutation__
 *
 * To run a mutation, you first call `useCreateReporterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReporterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReporterMutation, { data, loading, error }] = useCreateReporterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReporterMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateReporterMutation, CreateReporterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateReporterMutation, CreateReporterMutationVariables>(CreateReporterDocument, options);
}
export type CreateReporterMutationHookResult = ReturnType<typeof useCreateReporterMutation>;
export type CreateReporterMutationResult = Apollo.MutationResult<CreateReporterMutation>;
export type CreateReporterMutationOptions = Apollo.BaseMutationOptions<
  CreateReporterMutation,
  CreateReporterMutationVariables
>;
export const CreateScopeDocument = gql`
  mutation CreateScope($data: CreateScopeInput!) {
    createScope(data: $data) {
      message
    }
  }
`;
export type CreateScopeMutationFn = Apollo.MutationFunction<CreateScopeMutation, CreateScopeMutationVariables>;

/**
 * __useCreateScopeMutation__
 *
 * To run a mutation, you first call `useCreateScopeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScopeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScopeMutation, { data, loading, error }] = useCreateScopeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateScopeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateScopeMutation, CreateScopeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateScopeMutation, CreateScopeMutationVariables>(CreateScopeDocument, options);
}
export type CreateScopeMutationHookResult = ReturnType<typeof useCreateScopeMutation>;
export type CreateScopeMutationResult = Apollo.MutationResult<CreateScopeMutation>;
export type CreateScopeMutationOptions = Apollo.BaseMutationOptions<CreateScopeMutation, CreateScopeMutationVariables>;
export const CreateSupplierDocument = gql`
  mutation CreateSupplier($data: CreateSupplierInput!) {
    createSupplier(data: $data) {
      message
    }
  }
`;
export type CreateSupplierMutationFn = Apollo.MutationFunction<CreateSupplierMutation, CreateSupplierMutationVariables>;

/**
 * __useCreateSupplierMutation__
 *
 * To run a mutation, you first call `useCreateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupplierMutation, { data, loading, error }] = useCreateSupplierMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSupplierMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSupplierMutation, CreateSupplierMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument, options);
}
export type CreateSupplierMutationHookResult = ReturnType<typeof useCreateSupplierMutation>;
export type CreateSupplierMutationResult = Apollo.MutationResult<CreateSupplierMutation>;
export type CreateSupplierMutationOptions = Apollo.BaseMutationOptions<
  CreateSupplierMutation,
  CreateSupplierMutationVariables
>;
export const GetAreasDocument = gql`
  query GetAreas($options: QueryOptions) {
    areas(options: $options) {
      data {
        id
        name
        nameSpanish
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetAreasQuery__
 *
 * To run a query within a React component, call `useGetAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAreasQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetAreasQuery(baseOptions?: Apollo.QueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
}
export function useGetAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
}
export type GetAreasQueryHookResult = ReturnType<typeof useGetAreasQuery>;
export type GetAreasLazyQueryHookResult = ReturnType<typeof useGetAreasLazyQuery>;
export type GetAreasQueryResult = Apollo.QueryResult<GetAreasQuery, GetAreasQueryVariables>;
export const GetBuildersDocument = gql`
  query GetBuilders($options: QueryOptions) {
    builders(options: $options) {
      data {
        id
        name
        primaryPhone
        primaryEmail
        companyId
        company {
          name
        }
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetBuildersQuery__
 *
 * To run a query within a React component, call `useGetBuildersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildersQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetBuildersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBuildersQuery, GetBuildersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBuildersQuery, GetBuildersQueryVariables>(GetBuildersDocument, options);
}
export function useGetBuildersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBuildersQuery, GetBuildersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBuildersQuery, GetBuildersQueryVariables>(GetBuildersDocument, options);
}
export type GetBuildersQueryHookResult = ReturnType<typeof useGetBuildersQuery>;
export type GetBuildersLazyQueryHookResult = ReturnType<typeof useGetBuildersLazyQuery>;
export type GetBuildersQueryResult = Apollo.QueryResult<GetBuildersQuery, GetBuildersQueryVariables>;
export const GetCommunitiesDocument = gql`
  query GetCommunities($options: QueryOptions) {
    communities(options: $options) {
      data {
        id
        name
        companyId
        company {
          name
        }
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunitiesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCommunitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCommunitiesQuery, GetCommunitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommunitiesQuery, GetCommunitiesQueryVariables>(GetCommunitiesDocument, options);
}
export function useGetCommunitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommunitiesQuery, GetCommunitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommunitiesQuery, GetCommunitiesQueryVariables>(GetCommunitiesDocument, options);
}
export type GetCommunitiesQueryHookResult = ReturnType<typeof useGetCommunitiesQuery>;
export type GetCommunitiesLazyQueryHookResult = ReturnType<typeof useGetCommunitiesLazyQuery>;
export type GetCommunitiesQueryResult = Apollo.QueryResult<GetCommunitiesQuery, GetCommunitiesQueryVariables>;
export const GetCompaniesDocument = gql`
  query GetCompanies($options: QueryOptions) {
    companies(options: $options) {
      data {
        id
        name
        primaryAddress
        primaryEmail
        primaryPhone
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
}
export function useGetCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
}
export type GetCompaniesQueryHookResult = ReturnType<typeof useGetCompaniesQuery>;
export type GetCompaniesLazyQueryHookResult = ReturnType<typeof useGetCompaniesLazyQuery>;
export type GetCompaniesQueryResult = Apollo.QueryResult<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetContractorsDocument = gql`
  query GetContractors($options: QueryOptions) {
    contractors(options: $options) {
      data {
        id
        name
        primaryPhone
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetContractorsQuery__
 *
 * To run a query within a React component, call `useGetContractorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractorsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetContractorsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContractorsQuery, GetContractorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContractorsQuery, GetContractorsQueryVariables>(GetContractorsDocument, options);
}
export function useGetContractorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContractorsQuery, GetContractorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetContractorsQuery, GetContractorsQueryVariables>(GetContractorsDocument, options);
}
export type GetContractorsQueryHookResult = ReturnType<typeof useGetContractorsQuery>;
export type GetContractorsLazyQueryHookResult = ReturnType<typeof useGetContractorsLazyQuery>;
export type GetContractorsQueryResult = Apollo.QueryResult<GetContractorsQuery, GetContractorsQueryVariables>;
export const GetReportersDocument = gql`
  query GetReporters($options: QueryOptions) {
    reporters(options: $options) {
      data {
        id
        name
        primaryPhone
        primaryEmail
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetReportersQuery__
 *
 * To run a query within a React component, call `useGetReportersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportersQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetReportersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetReportersQuery, GetReportersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReportersQuery, GetReportersQueryVariables>(GetReportersDocument, options);
}
export function useGetReportersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReportersQuery, GetReportersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetReportersQuery, GetReportersQueryVariables>(GetReportersDocument, options);
}
export type GetReportersQueryHookResult = ReturnType<typeof useGetReportersQuery>;
export type GetReportersLazyQueryHookResult = ReturnType<typeof useGetReportersLazyQuery>;
export type GetReportersQueryResult = Apollo.QueryResult<GetReportersQuery, GetReportersQueryVariables>;
export const GetScopesDocument = gql`
  query GetScopes($options: QueryOptions) {
    scopes(options: $options) {
      data {
        id
        name
        nameSpanish
        description
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetScopesQuery__
 *
 * To run a query within a React component, call `useGetScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScopesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetScopesQuery(baseOptions?: Apollo.QueryHookOptions<GetScopesQuery, GetScopesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScopesQuery, GetScopesQueryVariables>(GetScopesDocument, options);
}
export function useGetScopesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScopesQuery, GetScopesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScopesQuery, GetScopesQueryVariables>(GetScopesDocument, options);
}
export type GetScopesQueryHookResult = ReturnType<typeof useGetScopesQuery>;
export type GetScopesLazyQueryHookResult = ReturnType<typeof useGetScopesLazyQuery>;
export type GetScopesQueryResult = Apollo.QueryResult<GetScopesQuery, GetScopesQueryVariables>;
export const GetSuppliersDocument = gql`
  query GetSuppliers($options: QueryOptions) {
    suppliers(options: $options) {
      data {
        id
        name
        primaryPhone
        notes
        updatedBy
        createdBy
        createdTime
        updatedTime
        archived
        legacy
      }
      pagination {
        page
        pageSize
        totalCount
      }
      sorting {
        field
        order
      }
    }
  }
`;

/**
 * __useGetSuppliersQuery__
 *
 * To run a query within a React component, call `useGetSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetSuppliersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
}
export function useGetSuppliersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
}
export type GetSuppliersQueryHookResult = ReturnType<typeof useGetSuppliersQuery>;
export type GetSuppliersLazyQueryHookResult = ReturnType<typeof useGetSuppliersLazyQuery>;
export type GetSuppliersQueryResult = Apollo.QueryResult<GetSuppliersQuery, GetSuppliersQueryVariables>;
export const GetOptionsDocument = gql`
  query GetOptions {
    areas {
      data {
        id
        name
      }
    }
    builders {
      data {
        id
        name
      }
    }
    communities {
      data {
        id
        name
      }
    }
    companies {
      data {
        id
        name
      }
    }
    contractors {
      data {
        id
        name
      }
    }
    reporters {
      data {
        id
        name
      }
    }
    scopes {
      data {
        id
        name
      }
    }
    suppliers {
      data {
        id
        name
      }
    }
  }
`;

/**
 * __useGetOptionsQuery__
 *
 * To run a query within a React component, call `useGetOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetOptionsQuery, GetOptionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOptionsQuery, GetOptionsQueryVariables>(GetOptionsDocument, options);
}
export function useGetOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOptionsQuery, GetOptionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOptionsQuery, GetOptionsQueryVariables>(GetOptionsDocument, options);
}
export type GetOptionsQueryHookResult = ReturnType<typeof useGetOptionsQuery>;
export type GetOptionsLazyQueryHookResult = ReturnType<typeof useGetOptionsLazyQuery>;
export type GetOptionsQueryResult = Apollo.QueryResult<GetOptionsQuery, GetOptionsQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;

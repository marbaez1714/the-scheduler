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

export type Builder = {
  __typename?: 'Builder';
  archived: Scalars['Boolean'];
  companyId: Scalars['String'];
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

export type Community = {
  __typename?: 'Community';
  archived: Scalars['Boolean'];
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
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
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
  areaId?: Maybe<Scalars['String']>;
  builderId?: Maybe<Scalars['String']>;
  communityId?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['String']>;
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
  reporterId?: Maybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areasAll: Array<Area>;
  builderById?: Maybe<Builder>;
  buildersAll: Array<Builder>;
  communitiesAll: Array<Community>;
  communityById?: Maybe<Community>;
  companiesAll: Array<Company>;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractorsAll: Array<Contractor>;
  jobLegacyById?: Maybe<JobLegacy>;
  jobsLegacyAll: Array<JobLegacy>;
  reporterById?: Maybe<Reporter>;
  reportersAll: Array<Reporter>;
  scopeById?: Maybe<Scope>;
  scopesAll: Array<Scope>;
  supplierById?: Maybe<Supplier>;
  suppliersAll: Array<Supplier>;
};


export type QueryAreaByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBuilderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCompanyByIdArgs = {
  id: Scalars['ID'];
};


export type QueryContractorByIdArgs = {
  id: Scalars['ID'];
};


export type QueryJobLegacyByIdArgs = {
  id: Scalars['ID'];
};


export type QueryReporterByIdArgs = {
  id: Scalars['ID'];
};


export type QueryScopeByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySupplierByIdArgs = {
  id: Scalars['ID'];
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

export type GetAllAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAreasQuery = { __typename?: 'Query', areasAll: Array<{ __typename?: 'Area', id: string, name: string, nameSpanish: string, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };


export const GetAllAreasDocument = gql`
    query GetAllAreas {
  areasAll {
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
}
    `;

/**
 * __useGetAllAreasQuery__
 *
 * To run a query within a React component, call `useGetAllAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAreasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAreasQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAreasQuery, GetAllAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAreasQuery, GetAllAreasQueryVariables>(GetAllAreasDocument, options);
      }
export function useGetAllAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAreasQuery, GetAllAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAreasQuery, GetAllAreasQueryVariables>(GetAllAreasDocument, options);
        }
export type GetAllAreasQueryHookResult = ReturnType<typeof useGetAllAreasQuery>;
export type GetAllAreasLazyQueryHookResult = ReturnType<typeof useGetAllAreasLazyQuery>;
export type GetAllAreasQueryResult = Apollo.QueryResult<GetAllAreasQuery, GetAllAreasQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
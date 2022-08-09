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

export type ArchiveAreaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveAreaMutation = { __typename?: 'Mutation', archiveArea: { __typename?: 'MessageResponse', message: string } };

export type ArchiveBuilderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveBuilderMutation = { __typename?: 'Mutation', archiveBuilder: { __typename?: 'MessageResponse', message: string } };

export type ArchiveCommunityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveCommunityMutation = { __typename?: 'Mutation', archiveCommunity: { __typename?: 'MessageResponse', message: string } };

export type ArchiveCompanyMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveCompanyMutation = { __typename?: 'Mutation', archiveCompany: { __typename?: 'MessageResponse', message: string } };

export type ArchiveContractorMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveContractorMutation = { __typename?: 'Mutation', archiveContractor: { __typename?: 'MessageResponse', message: string } };

export type ArchiveReporterMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveReporterMutation = { __typename?: 'Mutation', archiveReporter: { __typename?: 'MessageResponse', message: string } };

export type ArchiveScopeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveScopeMutation = { __typename?: 'Mutation', archiveScope: { __typename?: 'MessageResponse', message: string } };

export type ArchiveSupplierMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveSupplierMutation = { __typename?: 'Mutation', archiveSupplier: { __typename?: 'MessageResponse', message: string } };

export type GetAllAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAreasQuery = { __typename?: 'Query', areasAll: Array<{ __typename?: 'Area', id: string, name: string, nameSpanish: string, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllBuildersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBuildersQuery = { __typename?: 'Query', buildersAll: Array<{ __typename?: 'Builder', id: string, name: string, primaryPhone: string, primaryEmail?: string | null, companyId: string, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCommunitiesQuery = { __typename?: 'Query', communitiesAll: Array<{ __typename?: 'Community', id: string, name: string, companyId: string, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCompaniesQuery = { __typename?: 'Query', companiesAll: Array<{ __typename?: 'Company', id: string, name: string, primaryAddress?: string | null, primaryEmail?: string | null, primaryPhone?: string | null, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllContractorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllContractorsQuery = { __typename?: 'Query', contractorsAll: Array<{ __typename?: 'Contractor', id: string, name: string, primaryPhone: string, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllReportersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReportersQuery = { __typename?: 'Query', reportersAll: Array<{ __typename?: 'Reporter', id: string, name: string, primaryPhone: string, primaryEmail?: string | null, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllScopesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScopesQuery = { __typename?: 'Query', scopesAll: Array<{ __typename?: 'Scope', id: string, name: string, nameSpanish: string, description?: string | null, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };

export type GetAllSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSuppliersQuery = { __typename?: 'Query', suppliersAll: Array<{ __typename?: 'Supplier', id: string, name: string, primaryPhone?: string | null, notes?: string | null, updatedBy: string, createdBy: string, createdTime: string, updatedTime: string, archived: boolean, legacy: boolean }> };


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
export function useArchiveAreaMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveAreaMutation, ArchiveAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
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
export function useArchiveBuilderMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>(ArchiveBuilderDocument, options);
      }
export type ArchiveBuilderMutationHookResult = ReturnType<typeof useArchiveBuilderMutation>;
export type ArchiveBuilderMutationResult = Apollo.MutationResult<ArchiveBuilderMutation>;
export type ArchiveBuilderMutationOptions = Apollo.BaseMutationOptions<ArchiveBuilderMutation, ArchiveBuilderMutationVariables>;
export const ArchiveCommunityDocument = gql`
    mutation ArchiveCommunity($id: ID!) {
  archiveCommunity(id: $id) {
    message
  }
}
    `;
export type ArchiveCommunityMutationFn = Apollo.MutationFunction<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>;

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
export function useArchiveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>(ArchiveCommunityDocument, options);
      }
export type ArchiveCommunityMutationHookResult = ReturnType<typeof useArchiveCommunityMutation>;
export type ArchiveCommunityMutationResult = Apollo.MutationResult<ArchiveCommunityMutation>;
export type ArchiveCommunityMutationOptions = Apollo.BaseMutationOptions<ArchiveCommunityMutation, ArchiveCommunityMutationVariables>;
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
export function useArchiveCompanyMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>(ArchiveCompanyDocument, options);
      }
export type ArchiveCompanyMutationHookResult = ReturnType<typeof useArchiveCompanyMutation>;
export type ArchiveCompanyMutationResult = Apollo.MutationResult<ArchiveCompanyMutation>;
export type ArchiveCompanyMutationOptions = Apollo.BaseMutationOptions<ArchiveCompanyMutation, ArchiveCompanyMutationVariables>;
export const ArchiveContractorDocument = gql`
    mutation ArchiveContractor($id: ID!) {
  archiveContractor(id: $id) {
    message
  }
}
    `;
export type ArchiveContractorMutationFn = Apollo.MutationFunction<ArchiveContractorMutation, ArchiveContractorMutationVariables>;

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
export function useArchiveContractorMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveContractorMutation, ArchiveContractorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveContractorMutation, ArchiveContractorMutationVariables>(ArchiveContractorDocument, options);
      }
export type ArchiveContractorMutationHookResult = ReturnType<typeof useArchiveContractorMutation>;
export type ArchiveContractorMutationResult = Apollo.MutationResult<ArchiveContractorMutation>;
export type ArchiveContractorMutationOptions = Apollo.BaseMutationOptions<ArchiveContractorMutation, ArchiveContractorMutationVariables>;
export const ArchiveReporterDocument = gql`
    mutation ArchiveReporter($id: ID!) {
  archiveReporter(id: $id) {
    message
  }
}
    `;
export type ArchiveReporterMutationFn = Apollo.MutationFunction<ArchiveReporterMutation, ArchiveReporterMutationVariables>;

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
export function useArchiveReporterMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveReporterMutation, ArchiveReporterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveReporterMutation, ArchiveReporterMutationVariables>(ArchiveReporterDocument, options);
      }
export type ArchiveReporterMutationHookResult = ReturnType<typeof useArchiveReporterMutation>;
export type ArchiveReporterMutationResult = Apollo.MutationResult<ArchiveReporterMutation>;
export type ArchiveReporterMutationOptions = Apollo.BaseMutationOptions<ArchiveReporterMutation, ArchiveReporterMutationVariables>;
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
export function useArchiveScopeMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveScopeMutation, ArchiveScopeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveScopeMutation, ArchiveScopeMutationVariables>(ArchiveScopeDocument, options);
      }
export type ArchiveScopeMutationHookResult = ReturnType<typeof useArchiveScopeMutation>;
export type ArchiveScopeMutationResult = Apollo.MutationResult<ArchiveScopeMutation>;
export type ArchiveScopeMutationOptions = Apollo.BaseMutationOptions<ArchiveScopeMutation, ArchiveScopeMutationVariables>;
export const ArchiveSupplierDocument = gql`
    mutation ArchiveSupplier($id: ID!) {
  archiveSupplier(id: $id) {
    message
  }
}
    `;
export type ArchiveSupplierMutationFn = Apollo.MutationFunction<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>;

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
export function useArchiveSupplierMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>(ArchiveSupplierDocument, options);
      }
export type ArchiveSupplierMutationHookResult = ReturnType<typeof useArchiveSupplierMutation>;
export type ArchiveSupplierMutationResult = Apollo.MutationResult<ArchiveSupplierMutation>;
export type ArchiveSupplierMutationOptions = Apollo.BaseMutationOptions<ArchiveSupplierMutation, ArchiveSupplierMutationVariables>;
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
export const GetAllBuildersDocument = gql`
    query GetAllBuilders {
  buildersAll {
    id
    name
    primaryPhone
    primaryEmail
    companyId
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
 * __useGetAllBuildersQuery__
 *
 * To run a query within a React component, call `useGetAllBuildersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBuildersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBuildersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBuildersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBuildersQuery, GetAllBuildersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBuildersQuery, GetAllBuildersQueryVariables>(GetAllBuildersDocument, options);
      }
export function useGetAllBuildersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBuildersQuery, GetAllBuildersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBuildersQuery, GetAllBuildersQueryVariables>(GetAllBuildersDocument, options);
        }
export type GetAllBuildersQueryHookResult = ReturnType<typeof useGetAllBuildersQuery>;
export type GetAllBuildersLazyQueryHookResult = ReturnType<typeof useGetAllBuildersLazyQuery>;
export type GetAllBuildersQueryResult = Apollo.QueryResult<GetAllBuildersQuery, GetAllBuildersQueryVariables>;
export const GetAllCommunitiesDocument = gql`
    query GetAllCommunities {
  communitiesAll {
    id
    name
    companyId
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
 * __useGetAllCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetAllCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>(GetAllCommunitiesDocument, options);
      }
export function useGetAllCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>(GetAllCommunitiesDocument, options);
        }
export type GetAllCommunitiesQueryHookResult = ReturnType<typeof useGetAllCommunitiesQuery>;
export type GetAllCommunitiesLazyQueryHookResult = ReturnType<typeof useGetAllCommunitiesLazyQuery>;
export type GetAllCommunitiesQueryResult = Apollo.QueryResult<GetAllCommunitiesQuery, GetAllCommunitiesQueryVariables>;
export const GetAllCompaniesDocument = gql`
    query GetAllCompanies {
  companiesAll {
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
}
    `;

/**
 * __useGetAllCompaniesQuery__
 *
 * To run a query within a React component, call `useGetAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
      }
export function useGetAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
        }
export type GetAllCompaniesQueryHookResult = ReturnType<typeof useGetAllCompaniesQuery>;
export type GetAllCompaniesLazyQueryHookResult = ReturnType<typeof useGetAllCompaniesLazyQuery>;
export type GetAllCompaniesQueryResult = Apollo.QueryResult<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>;
export const GetAllContractorsDocument = gql`
    query GetAllContractors {
  contractorsAll {
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
}
    `;

/**
 * __useGetAllContractorsQuery__
 *
 * To run a query within a React component, call `useGetAllContractorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllContractorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllContractorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllContractorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllContractorsQuery, GetAllContractorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllContractorsQuery, GetAllContractorsQueryVariables>(GetAllContractorsDocument, options);
      }
export function useGetAllContractorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllContractorsQuery, GetAllContractorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllContractorsQuery, GetAllContractorsQueryVariables>(GetAllContractorsDocument, options);
        }
export type GetAllContractorsQueryHookResult = ReturnType<typeof useGetAllContractorsQuery>;
export type GetAllContractorsLazyQueryHookResult = ReturnType<typeof useGetAllContractorsLazyQuery>;
export type GetAllContractorsQueryResult = Apollo.QueryResult<GetAllContractorsQuery, GetAllContractorsQueryVariables>;
export const GetAllReportersDocument = gql`
    query GetAllReporters {
  reportersAll {
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
}
    `;

/**
 * __useGetAllReportersQuery__
 *
 * To run a query within a React component, call `useGetAllReportersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReportersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReportersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReportersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReportersQuery, GetAllReportersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReportersQuery, GetAllReportersQueryVariables>(GetAllReportersDocument, options);
      }
export function useGetAllReportersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReportersQuery, GetAllReportersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReportersQuery, GetAllReportersQueryVariables>(GetAllReportersDocument, options);
        }
export type GetAllReportersQueryHookResult = ReturnType<typeof useGetAllReportersQuery>;
export type GetAllReportersLazyQueryHookResult = ReturnType<typeof useGetAllReportersLazyQuery>;
export type GetAllReportersQueryResult = Apollo.QueryResult<GetAllReportersQuery, GetAllReportersQueryVariables>;
export const GetAllScopesDocument = gql`
    query GetAllScopes {
  scopesAll {
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
}
    `;

/**
 * __useGetAllScopesQuery__
 *
 * To run a query within a React component, call `useGetAllScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScopesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllScopesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScopesQuery, GetAllScopesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllScopesQuery, GetAllScopesQueryVariables>(GetAllScopesDocument, options);
      }
export function useGetAllScopesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScopesQuery, GetAllScopesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllScopesQuery, GetAllScopesQueryVariables>(GetAllScopesDocument, options);
        }
export type GetAllScopesQueryHookResult = ReturnType<typeof useGetAllScopesQuery>;
export type GetAllScopesLazyQueryHookResult = ReturnType<typeof useGetAllScopesLazyQuery>;
export type GetAllScopesQueryResult = Apollo.QueryResult<GetAllScopesQuery, GetAllScopesQueryVariables>;
export const GetAllSuppliersDocument = gql`
    query GetAllSuppliers {
  suppliersAll {
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
}
    `;

/**
 * __useGetAllSuppliersQuery__
 *
 * To run a query within a React component, call `useGetAllSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSuppliersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSuppliersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
      }
export function useGetAllSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
        }
export type GetAllSuppliersQueryHookResult = ReturnType<typeof useGetAllSuppliersQuery>;
export type GetAllSuppliersLazyQueryHookResult = ReturnType<typeof useGetAllSuppliersLazyQuery>;
export type GetAllSuppliersQueryResult = Apollo.QueryResult<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
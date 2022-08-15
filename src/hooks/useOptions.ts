import { useMemo } from 'react';
import {
  useGetCompaniesQuery,
  useGetAreasQuery,
  useGetBuildersQuery,
  useGetContractorsQuery,
  useGetCommunitiesQuery,
  useGetReportersQuery,
  useGetSuppliersQuery,
  useGetScopesQuery,
} from 'src/api';

const createOption = (item: { name: string; id: string }) => ({ label: item.name || 'Missing Name', value: item.id });

export const useOptions = () => {
  const { data: getAreasData } = useGetAreasQuery();
  const { data: getBuildersData } = useGetBuildersQuery();
  const { data: getCommunitiesData } = useGetCommunitiesQuery();
  const { data: getCompaniesData } = useGetCompaniesQuery();
  const { data: getContractorsData } = useGetContractorsQuery();
  const { data: getReportersData } = useGetReportersQuery();
  const { data: getScopesData } = useGetScopesQuery();
  const { data: getSuppliersData } = useGetSuppliersQuery();

  return {
    areaOptions: getAreasData?.areas.data.map(createOption) ?? [],
    builderOptions: getBuildersData?.builders.data.map(createOption) ?? [],
    communityOptions: getCommunitiesData?.communities.data.map(createOption) ?? [],
    companyOptions: getCompaniesData?.companies.data.map(createOption) ?? [],
    contractorsOptions: getContractorsData?.contractors.data.map(createOption) ?? [],
    reporterOptions: getReportersData?.reporters.data.map(createOption) ?? [],
    scopeOptions: getScopesData?.scopes.data.map(createOption) ?? [],
    supplierOptions: getSuppliersData?.suppliers.data.map(createOption) ?? [],
  };
};

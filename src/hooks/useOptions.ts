import { useGetOptionsQuery } from 'src/api';

const createOption = (item: { name: string; id: string }) => ({
  label: item.name || 'Missing Name',
  value: item.id,
});

export const useOptions = () => {
  const { data } = useGetOptionsQuery();

  return {
    areaOptions: data?.areas.data.map(createOption) ?? [],
    builderOptions: data?.builders.data.map(createOption) ?? [],
    communityOptions: data?.communities.data.map(createOption) ?? [],
    companyOptions: data?.companies.data.map(createOption) ?? [],
    contractorsOptions: data?.contractors.data.map(createOption) ?? [],
    reporterOptions: data?.reporters.data.map(createOption) ?? [],
    scopeOptions: data?.scopes.data.map(createOption) ?? [],
    supplierOptions: data?.suppliers.data.map(createOption) ?? [],
  };
};

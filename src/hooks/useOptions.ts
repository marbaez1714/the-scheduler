import { useMemo } from 'react';
import { useFirebase } from './useFirebase';

const createOption = (item: { name: string; id: string }) => ({ label: item.name || 'Missing Name', value: item.id });

export const useOptions = () => {
  const { storeData } = useFirebase();

  const areaOptions = useMemo(() => {
    const documents = storeData.areas?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.areas]);

  const builderOptions = useMemo(() => {
    const documents = storeData.builders?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.builders]);

  const communityOptions = useMemo(() => {
    const documents = storeData.communities?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.communities]);

  const companyOptions = useMemo(() => {
    const documents = storeData.companies?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.companies]);

  const contractorsOptions = useMemo(() => {
    const documents = storeData.contractors?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.contractors]);

  const reporterOptions = useMemo(() => {
    const documents = storeData.reporters?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.reporters]);

  const scopeOptions = useMemo(() => {
    const documents = storeData.scopes?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.scopes]);

  const supplierOptions = useMemo(() => {
    const documents = storeData.suppliers?.documents ?? [];
    return documents.map(createOption);
  }, [storeData.suppliers]);

  return {
    areaOptions,
    builderOptions,
    communityOptions,
    companyOptions,
    contractorsOptions,
    reporterOptions,
    scopeOptions,
    supplierOptions,
  };
};

import { useMemo } from 'react';
import { useFirebase } from './useFirebase';

export const useOptions = () => {
  const { storeData } = useFirebase();

  const areaOptions = useMemo(() => {
    const documents = storeData.areas?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.areas]);

  const builderOptions = useMemo(() => {
    const documents = storeData.builders?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.builders]);

  const communityOptions = useMemo(() => {
    const documents = storeData.communities?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.communities]);

  const contractorsOptions = useMemo(() => {
    const documents = storeData.contractors?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.contractors]);

  const reporterOptions = useMemo(() => {
    const documents = storeData.reporters?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.reporters]);

  const scopeOptions = useMemo(() => {
    const documents = storeData.scopes?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.scopes]);

  const supplierOptions = useMemo(() => {
    const documents = storeData.suppliers?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.suppliers]);

  return {
    areaOptions,
    builderOptions,
    communityOptions,
    contractorsOptions,
    reporterOptions,
    scopeOptions,
    supplierOptions,
  };
};

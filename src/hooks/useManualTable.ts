import { useState } from 'react';

export const useManualTable = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const handlePaginationChange = (pageIndex: number) => {
    setPagination((prev) => ({ page: pageIndex + 1, pageSize: prev.pageSize }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ page: 1, pageSize });
  };

  return {
    pagination,
    handlePaginationChange,
    handlePageSizeChange,
  };
};

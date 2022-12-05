import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Supplier,
  useArchiveSupplierMutation,
  useGetSuppliersQuery,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const SupplierList = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetSuppliersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveSupplierMutation({
    onCompleted: (data) => {
      toast.success(data.archiveSupplier.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const primaryAction = {
    title: 'Add Supplier',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions = (data: Supplier) => [
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: () => navigate(data.id),
    },
    {
      icon: <ArchiveBoxIcon />,
      label: 'Archive',
      onClick: () =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns = [
    dataColumns.supplierMenu(rowActions),
    dataColumns.name,
    dataColumns.primaryPhone,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<Supplier>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Suppliers List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.suppliers && (
        <Table
          data={data.suppliers.data as Supplier[]}
          columns={tableColumns}
        />
      )}
    </Screen.Content>
  );
};

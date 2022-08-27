import { AddBox } from '@mui/icons-material';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Supplier, useArchiveSupplierMutation, useGetSuppliersQuery } from 'src/api';

import { Content } from 'src/components/Content';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from '../utils';

export const SupplierList = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetSuppliersQuery({ fetchPolicy: 'cache-and-network' });

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
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Supplier>[] = [
    { icon: 'edit', label: 'Edit', onClick: (data) => navigate(data.id) },
    {
      icon: 'archive',
      label: 'Archive',
      onClick: (data) => confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns: ColumnDef<Supplier>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'primaryPhone',
      header: 'Primary Phone',
      accessorKey: 'primaryPhone',
      cell: ({ getValue }) => <Table.PhoneNumberCell value={getValue()} />,
    },
    {
      id: 'createdTime',
      header: 'Created',
      accessorFn: (row) => format(new Date(row.createdTime), 'P'),
      cell: (data) => <Table.DateCell timestamp={data.row.original.createdTime} />,
    },
    {
      id: 'updatedTime',
      header: 'Updated',
      accessorFn: (row) => format(new Date(row.updatedTime), 'P'),
      cell: (data) => <Table.DateCell timestamp={data.row.original.updatedTime} />,
    },
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      cell: (data) => <Table.DataIdCell data={{ id: data.getValue(), legacy: data.row.original.legacy ?? false }} />,
    },
  ];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col w-full items-start space-y-4" loading={loading || archiveLoading}>
      {/* Area List */}
      {data?.suppliers && (
        <Table
          title="Suppliers List"
          data={data.suppliers.data as Supplier[]}
          columns={tableColumns}
          total={data.suppliers.meta.totalCount}
          rowActions={rowActions}
        />
      )}
      <Button onClick={() => navigate('add')} startIcon={<AddBox />} color="inherit" variant="contained" fullWidth>
        Add a Supplier
      </Button>
    </Content>
  );
};

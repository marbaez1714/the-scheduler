import { AddBox } from '@mui/icons-material';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Scope, useArchiveScopeMutation, useGetScopesQuery } from 'src/api';

import { Content } from 'src/components/Content';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from '../utils';

export const ScopeList = () => {
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
  const { data, loading, refetch } = useGetScopesQuery({ fetchPolicy: 'cache-and-network' });

  const [archive, { loading: archiveLoading }] = useArchiveScopeMutation({
    onCompleted: (data) => {
      toast.success(data.archiveScope.message);
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
  const rowActions: TableRowAction<Scope>[] = [
    { icon: 'edit', label: 'Edit', onClick: (data) => navigate(data.id) },
    {
      icon: 'archive',
      label: 'Archive',
      onClick: (data) => confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns: ColumnDef<Scope>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'nameSpanish',
      header: 'Name Translation (Spanish)',
      accessorKey: 'nameSpanish',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
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
    <Content className="flex-col space-y-4" loading={loading || archiveLoading}>
      {/* Area List */}
      {data?.scopes && (
        <Table
          title="Scopes List"
          data={data.scopes.data as Scope[]}
          columns={tableColumns}
          total={data.scopes.meta.totalCount}
          rowActions={rowActions}
        />
      )}
      <Button onClick={() => navigate('add')} startIcon={<AddBox />} color="inherit" variant="contained" fullWidth>
        Add a Scope
      </Button>
    </Content>
  );
};

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Scope, useArchiveScopeMutation, useGetScopesQuery } from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';

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
  const { data, loading, refetch } = useGetScopesQuery({
    fetchPolicy: 'cache-and-network',
  });

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
  const primaryAction = {
    title: 'Add Scope',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Scope>[] = [
    { icon: 'edit', label: 'Edit', onClick: (data) => navigate(data.id) },
    {
      icon: 'archive',
      label: 'Archive',
      onClick: (data) =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
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
      header: () => <Table.HeaderCell title="Translation" subtitle="Spanish" />,
      accessorKey: 'nameSpanish',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'timestamp',
      header: () => (
        <Table.HeaderCell
          title="Timestamps"
          subtitle="Last Updated / First Created"
        />
      ),
      accessorFn: (row) => format(new Date(row.updatedTime), 'Pp'),
      cell: (data) => <Table.TimestampCell data={data.row.original} />,
    },
    {
      id: 'id',
      header: () => (
        <Table.HeaderCell title="ID" subtitle="Identifier / Origin" />
      ),
      accessorKey: 'id',
      cell: (data) => (
        <Table.DataIdCell
          data={{
            id: data.getValue(),
            legacy: data.row.original.legacy ?? false,
          }}
        />
      ),
    },
  ];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
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
    </Screen.Content>
  );
};

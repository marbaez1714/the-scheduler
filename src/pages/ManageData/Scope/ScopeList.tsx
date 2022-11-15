import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import { Scope, useArchiveScopeMutation, useGetScopesQuery } from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

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
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: (data) => navigate(data.id),
    },
    {
      icon: <ArchiveBoxIcon />,
      label: 'Archive',
      onClick: (data) =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns = [
    dataColumns.name,
    dataColumns.nameSpanish,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<Scope>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Scopes List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.scopes && (
        <Table
          data={data.scopes.data as Scope[]}
          columns={tableColumns}
          rowActions={rowActions}
        />
      )}
    </Screen.Content>
  );
};

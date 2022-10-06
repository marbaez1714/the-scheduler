import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Community,
  useArchiveCommunityMutation,
  useGetCommunitiesQuery,
} from 'src/api';

import { Table, TableRowAction } from 'src/components/Table';
import { Screen } from 'src/components/Screen';
import { confirmArchive } from 'src/utils/alerts';

export const CommunityList = () => {
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
  const { data, loading, refetch } = useGetCommunitiesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveCommunityMutation({
    onCompleted: (data) => {
      toast.success(data.archiveCommunity.message);
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
    title: 'Add Community',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Community>[] = [
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

  const tableColumns: ColumnDef<Community>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'company',
      header: 'Company',
      accessorFn: (row) => row.company.name,
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
      title="Communities List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.communities && (
        <Table
          data={data.communities.data as Community[]}
          columns={tableColumns}
          total={data.communities.meta.totalCount}
          rowActions={rowActions}
        />
      )}
    </Screen.Content>
  );
};

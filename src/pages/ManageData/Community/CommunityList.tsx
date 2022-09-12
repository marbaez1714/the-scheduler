import { AddBox } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  Community,
  useArchiveCommunityMutation,
  useGetCommunitiesQuery,
} from 'src/api';

import { Content, Table, TableRowAction } from 'src/components';
import { confirmArchive } from '../utils';

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

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Community>[] = [
    { icon: 'edit', label: 'Edit', onClick: (data) => navigate(data.id) },
    {
      icon: 'archive',
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
    <Content className="flex-col space-y-4" loading={loading || archiveLoading}>
      {/* Area List */}
      {data?.communities && (
        <Table
          title="Communities List"
          data={data.communities.data as Community[]}
          columns={tableColumns}
          total={data.communities.meta.totalCount}
          rowActions={rowActions}
        />
      )}
      <Button
        onClick={() => navigate('add')}
        startIcon={<AddBox />}
        color="inherit"
        variant="contained"
        fullWidth
      >
        Add a Community
      </Button>
    </Content>
  );
};

import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Community, useArchiveCommunityMutation, useGetCommunitiesQuery } from 'src/api';

import { Content, Table } from 'src/components';
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
  const { data, loading, refetch } = useGetCommunitiesQuery({ fetchPolicy: 'cache-and-network' });

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
  const getMenuActions = (data: Community) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      {
        icon: 'archive',
        label: 'Archive',
        onClick: () => confirmArchive(data.name) && archive({ variables: { id: data.id } }),
      },
    ];
  };

  /******************************/
  /* Render                     */
  /******************************/

  const tableColumns: ColumnDef<Community>[] = [
    {
      id: 'menu',
      header: '',
      enableSorting: false,
      cell: (data) => <Table.MenuCell menuActions={getMenuActions(data.row.original)} />,
    },
    { accessorKey: 'name', cell: ({ getValue }) => <Table.TextCell value={getValue()} />, header: 'Name' },
    {
      id: 'companyId',
      header: 'Company',
      accessorFn: (row) => row.company.name,
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
      header: 'ID',
      accessorKey: 'id',
      cell: (data) => <Table.DataIdCell data={{ id: data.getValue(), legacy: data.row.original.legacy ?? false }} />,
    },
  ];

  return (
    <Content className="flex w-full items-start space-x-4" loading={loading || archiveLoading}>
      <div className="flex flex-col space-y-2">
        {/* TODO: Add back action */}
        <IconButton title="back">
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => navigate('add')}>
          <AddBox />
        </IconButton>
      </div>

      {/* Company List */}
      {data?.communities && <Table title="Community List" data={data.communities.data} columns={tableColumns} />}
    </Content>
  );
};

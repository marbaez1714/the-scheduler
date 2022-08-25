import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Contractor, useArchiveContractorMutation, useGetContractorsQuery } from 'src/api';

import { Content } from 'src/components/Content';
import { Table } from 'src/components/Table';
import { confirmArchive } from '../utils';

export const ContractorList = () => {
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
  const { data, loading, refetch } = useGetContractorsQuery({ fetchPolicy: 'cache-and-network' });

  const [archive, { loading: archiveLoading }] = useArchiveContractorMutation({
    onCompleted: (data) => {
      toast.success(data.archiveContractor.message);
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
  const getMenuActions = (data: Contractor) => {
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
  /* Column Definitions         */
  /******************************/
  const tableColumns: ColumnDef<Contractor>[] = [
    {
      id: 'menu',
      header: '',
      enableSorting: false,
      cell: (data) => <Table.MenuCell menuActions={getMenuActions(data.row.original)} />,
    },
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

      {/* Contractors List */}
      {data?.contractors && <Table title="Contractors List" data={data.contractors.data} columns={tableColumns} />}
    </Content>
  );
};

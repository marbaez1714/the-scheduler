import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Area, useGetAllAreasQuery, useArchiveAreaMutation } from 'src/api';
import { Content, Table } from 'src/components';
import { confirmArchive } from '../utils';

export const AreaList = () => {
  // ----- HOOKS ----- //
  const navigate = useNavigate();

  const { data: areasData, loading: areasLoading } = useGetAllAreasQuery();
  const [archiveArea, { loading: archiveLoading }] = useArchiveAreaMutation();

  // ----- ACTIONS ----- //
  const handleArchiveClick = ({ name, id }: Area) => {
    const confirmed = confirmArchive(name);

    if (confirmed) {
      toast.promise(archiveArea({ variables: { id } }), {
        loading: `Archiving ${name}`,
        success: `${name} - Removed from areas.`,
        error: `Error removing ${name}`,
      });
    }
  };

  const getMenuActions = (data: Area) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      { icon: 'archive', label: 'Archive', onClick: () => handleArchiveClick(data) },
    ];
  };

  const tableColumns: ColumnDef<Area>[] = [
    {
      id: 'menu',
      header: '',
      enableSorting: false,
      cell: (data) => <Table.MenuCell menuActions={getMenuActions(data.row.original)} />,
    },
    { accessorKey: 'name', cell: ({ getValue }) => <Table.TextCell value={getValue()} />, header: 'Name' },
    {
      accessorKey: 'nameSpanish',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
      header: 'Spanish Translation',
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
    <Content className="flex w-full items-start space-x-4" loading={areasLoading || archiveLoading}>
      <div className="flex flex-col space-y-2">
        {/* TODO: Add back action */}
        <IconButton title="back">
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => navigate('add')}>
          <AddBox />
        </IconButton>
      </div>

      {/* Area List */}
      {!!areasData?.areasAll && <Table title="Area List" data={areasData.areasAll} columns={tableColumns} />}
    </Content>
  );
};

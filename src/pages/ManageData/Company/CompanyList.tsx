import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, Table } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { ResponseDocument } from 'src/utils/cloudFunctionTypes';
import { DocumentTableColumns } from 'src/utils/tableTypes';
import { confirmArchive } from '../utils';

export const CompanyList = () => {
  // - HOOKS - //
  const { storeData, loading, archiveStoreDocument } = useFirebase();
  const navigate = useNavigate();

  // - ACTIONS - //
  const handleArchiveClick = ({ name, id }: ResponseDocument<'Company'>) => {
    confirmArchive(name) &&
      toast.promise(archiveStoreDocument('Company', id), {
        loading: `Archiving ${name}`,
        success: `${name} - Removed from companies.`,
        error: `Error removing ${name}`,
      });
  };

  const getMenuActions = (data: ResponseDocument<'Company'>) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      { icon: 'archive', label: 'Archive', onClick: () => handleArchiveClick(data) },
    ];
  };

  // - HELPERS - //
  const tableColumns: DocumentTableColumns<'Company'> = [
    {
      id: 'menu',
      header: '',
      enableSorting: false,
      cell: (data) => <Table.MenuCell menuActions={getMenuActions(data.row.original)} />,
    },
    { accessorKey: 'name', cell: ({ getValue }) => <Table.TextCell value={getValue()} />, header: 'Name' },
    {
      accessorKey: 'primaryPhone',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
      header: 'Phone Number',
    },
    { accessorKey: 'primaryEmail', cell: ({ getValue }) => <Table.TextCell value={getValue()} />, header: 'Email' },
    { accessorKey: 'primaryAddress', cell: ({ getValue }) => <Table.TextCell value={getValue()} />, header: 'Address' },
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

  // - JSX - //
  return (
    <Content className="flex w-full items-start space-x-4" loading={loading}>
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
      {storeData.companies && (
        <Table title="Company List" data={storeData.companies?.documents ?? []} columns={tableColumns} />
      )}
    </Content>
  );
};

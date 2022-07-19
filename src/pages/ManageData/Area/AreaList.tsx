import { AddBox, ArrowBack, Check } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, Table } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { ResponseDocument } from 'src/utils/cloudFunctionTypes';
import { DocumentTableColumns } from 'src/utils/tableTypes';
import { confirmArchive } from '../utils';

export const AreaList = () => {
  // ----- HOOKS ----- //
  const { storeData, loading, archiveStoreDocument } = useFirebase();
  const navigate = useNavigate();

  // ----- ACTIONS ----- //
  const handleArchiveClick = ({ name, id }: ResponseDocument<'Area'>) => {
    if (confirmArchive(name)) {
      toast.promise(archiveStoreDocument('Area', id), {
        loading: `Archiving ${name}`,
        success: `${name} - Removed from areas.`,
        error: `Error removing ${name}`,
      });
    }
  };

  const getMenuActions = (data: ResponseDocument<'Area'>) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      { icon: 'archive', label: 'Archive', onClick: () => handleArchiveClick(data) },
    ];
  };

  const tableColumns: DocumentTableColumns<'Area'> = [
    {
      header: 'General',
      columns: [
        { accessorKey: 'name', cell: (data) => data.getValue(), header: 'Name' },
        { accessorKey: 'nameSpanish', cell: (data) => data.getValue(), header: 'Spanish Translation' },
      ],
    },
    {
      header: 'Metadata',
      columns: [
        {
          accessorKey: 'createdTime',
          cell: (data) => <Table.DateCell timestamp={data.getValue()} />,
          header: 'Created',
        },
        {
          accessorKey: 'updatedTime',
          cell: (data) => <Table.DateCell timestamp={data.getValue()} />,
          header: 'Updated',
        },
        {
          accessorKey: 'legacy',
          cell: (data) => (data.getValue() ? <Check fontSize="inherit" /> : ''),
          header: 'Legacy',
        },
      ],
    },
  ];

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

      {/* Area List */}
      {storeData.areas && <Table data={storeData.areas?.documents ?? []} columns={tableColumns} />}
    </Content>
  );
};

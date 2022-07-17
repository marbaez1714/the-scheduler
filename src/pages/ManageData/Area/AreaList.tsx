import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { TableHeader } from 'src/components/TableHeader';
import { TableMenuCell } from 'src/components/TableMenu';
import { useFirebase } from 'src/hooks/useFirebase';
import { ResponseDocument } from 'src/utils/cloudFunctionTypes';
import { confirmArchive } from '../utils';

export const AreaList = () => {
  // - HOOKS - //
  const { storeData, loading, archiveStoreDocument } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //
  const handleArchiveClick = ({ name, id }: ResponseDocument<'Area'>) => {
    confirmArchive(name) &&
      toast.promise(archiveStoreDocument('Area', id), {
        loading: `Archiving ${name}`,
        success: `${name} - Removed from areas.`,
        error: `Error removing ${name}`,
      });
  };

  const getMenuActions = (data: ResponseDocument<'Area'>) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      { icon: 'archive', label: 'Archive', onClick: () => handleArchiveClick(data) },
    ];
  };

  // - HELPERS - //
  const columns = ['', 'Name', 'Translation (Spanish)'];

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

      {/* Area List */}
      {storeData.areas && (
        <table className="w-full border-collapse bg-slate-100 drop-shadow border-spacing-px">
          <TableHeader columns={columns} />
          {/* Body */}
          <tbody>
            {storeData.areas.documents.map((data) => (
              <tr key={data.id} className="border-b last:border-b-0 transition-all">
                {/* Action */}
                <TableMenuCell menuActions={getMenuActions(data)} />
                {/* Name */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.name}</td>
                {/* Name Spanish */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.nameSpanish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Content>
  );
};

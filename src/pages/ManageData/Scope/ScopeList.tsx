import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, TableHeader, TableMenuCell } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { ResponseDocument } from 'src/utils/cloudFunctionTypes';
import { confirmArchive } from '../utils';

export const ScopeList = () => {
  // - HOOKS - //
  const { storeData, loading, archiveStoreDocument } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //
  const handleArchiveClick = ({ name, id }: ResponseDocument<'Scope'>) => {
    confirmArchive(name) &&
      toast.promise(archiveStoreDocument('Scope', id), {
        loading: `Archiving ${name}`,
        success: `${name} - Removed from scopes.`,
        error: `Error removing ${name}`,
      });
  };

  const getMenuActions = (data: ResponseDocument<'Scope'>) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: () => navigate(data.id) },
      { icon: 'archive', label: 'Archive', onClick: () => handleArchiveClick(data) },
    ];
  };

  // - HELPERS - //
  const columns = ['', 'Name', 'Translation (Spanish)', 'Description'];

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

      {/* Scope List */}
      {storeData.scopes && (
        <table className="table-auto w-full border-collapse bg-slate-100 drop-shadow">
          <TableHeader columns={columns} />
          {/* Body */}
          <tbody>
            {storeData.scopes.documents.map((data) => (
              <tr key={data.id} className="border-b transition-all">
                {/* Action */}
                <TableMenuCell menuActions={getMenuActions(data)} />
                {/* Name */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.name}</td>
                {/* Name Spanish */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.nameSpanish}</td>
                {/* Description */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Content>
  );
};

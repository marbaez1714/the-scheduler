import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { TableHeader } from 'src/components/TableHeader';
import { TableMenuCell } from 'src/components/TableMenu';
import { useFirebase } from 'src/hooks/useFirebase';
import { useModal } from 'src/hooks/useModal';

export const AreaList = () => {
  // - HOOKS - //
  const { storeData, loading } = useFirebase();
  const { toggleConfirmationModal } = useModal();
  const navigate = useNavigate();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //
  const handleEditClick = (id: string) => () => {
    navigate(id);
  };

  const handleAddClick = () => {
    navigate('add');
  };

  // - HELPERS - //
  const columns = ['', 'Name', 'Translation (Spanish)'];

  const getMenuActions = (id: string) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: handleEditClick(id) },
      { icon: 'delete', label: 'Delete', onClick: toggleConfirmationModal },
    ];
  };

  // - JSX - //
  return (
    <Content className="flex w-full items-start space-x-4" loading={loading}>
      <div className="flex flex-col space-y-2">
        {/* TODO: Add back action */}
        <IconButton title="back">
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleAddClick}>
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
                <TableMenuCell menuActions={getMenuActions(data.id)} />
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

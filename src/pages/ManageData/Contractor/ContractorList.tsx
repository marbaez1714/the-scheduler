import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { useFirebase } from 'src/hooks/useFirebase';
import { TableHeader } from 'src/components/TableHeader';
import { TableMenuCell } from 'src/components/TableMenu';

export const ContractorList = () => {
  // - HOOKS - //
  const { storeData, loading } = useFirebase();
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
  const columns = ['', 'Name', 'Phone Number'];

  const getMenuActions = (id: string) => {
    return [
      { icon: 'edit', label: 'Edit', onClick: handleEditClick(id) },
      { icon: 'delete', label: 'Delete', onClick: handleEditClick(id) },
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

      {/* Contractor List */}
      {storeData.contractors && (
        <table className="table-auto w-full border-collapse bg-slate-100 drop-shadow">
          <TableHeader columns={columns} />
          {/* Body */}
          <tbody>
            {storeData.contractors.documents.map((data) => (
              <tr key={data.id} className="border-b transition-all">
                {/* Action */}
                <TableMenuCell menuActions={getMenuActions(data.id)} />
                {/* Name */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.name}</td>
                {/* Phone Number */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.primaryPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Content>
  );
};

import { AddBox, ArrowBack, Create } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { TableHeader } from 'src/components/TableHeader';
import { useFirebase } from 'src/hooks/useFirebase';

export const ReporterList = () => {
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
  const columns = ['', 'Name', 'Phone Number', 'Email'];

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

      {/* Reporter List */}
      <div className="overflow-auto rounded drop-shadow">
        {storeData.reporters && (
          <table className="table-auto w-full border-collapse bg-slate-100">
            <TableHeader columns={columns} />
            {/* Body */}
            <tbody>
              {storeData.reporters.documents.map((data) => (
                <tr key={data.id} className="border-b transition-all">
                  {/* Action */}
                  <td
                    className="p-2 text-center cursor-pointer hover:bg-slate-200"
                    onClick={handleEditClick(data.id)}
                  >
                    <Create className="text-sm" />
                  </td>
                  {/* Name */}
                  <td className="p-2">{data.name}</td>
                  {/* Phone Number */}
                  <td className="p-2">{data.primaryPhone || '-'}</td>
                  {/* Address */}
                  <td className="p-2">{data.primaryEmail || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Content>
  );
};

import { AddBox, ArrowBack, Create } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { useFirebase } from 'src/hooks/useFirebase';

export const ScopeList = () => {
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
  const headers = ['Actions', 'Name', 'Translation (Spanish)', 'Description'];

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

      {/* Scope List */}
      <div className="overflow-auto rounded drop-shadow w-full">
        {storeData.scopes && (
          <table className="table-auto w-full border-collapse bg-slate-100">
            {/* Header */}
            <thead className="text-left text-white font-medium">
              {/* Header Row */}
              <tr className="bg-slate-600">
                {headers.map((item, index) => (
                  <th className="p-2" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body */}
            <tbody>
              {storeData.scopes.documents.map((data) => (
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
                  {/* Name Spanish */}
                  <td className="p-2">{data.nameSpanish}</td>
                  {/* Description */}
                  <td className="p-2">{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Content>
  );
};

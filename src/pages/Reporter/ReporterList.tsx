import { AddBox, ArrowBack, Create } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { useFirebase } from 'src/hooks/useFirebase';

export const ReporterList = () => {
  // - HOOKS - //
  const { storeData } = useFirebase();
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

  // - JSX - //
  return (
    <Content className="flex w-full items-start space-x-4">
      <div className="flex flex-col space-y-2">
        {/* TODO: Add back action */}
        <IconButton title="back">
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleAddClick} title="add a company">
          <AddBox />
        </IconButton>
      </div>

      {/* Reporter List */}
      {storeData.reporters && (
        <table className="table-auto w-full border-collapse overflow-hidden rounded drop-shadow bg-slate-100">
          <colgroup>
            <col className="border-r" />
            <col className="border-r" />
            <col className="border-r" />
          </colgroup>
          {/* Header */}
          <thead className="text-left text-white font-medium">
            {/* Header Row */}
            <tr className="bg-slate-600">
              {/* Name */}
              <th className="p-2" colSpan={2}>
                Name
              </th>
              {/* Phone Number */}
              <th className="p-2">Phone Number</th>
              {/* Email */}
              <th className="p-2">Email</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {storeData.reporters.documents.map((data) => (
              <tr
                key={data.id}
                className="border-b transition-all hover:bg-slate-50"
              >
                {/* Action */}
                <td
                  className="p-2 text-center cursor-pointer"
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
    </Content>
  );
};

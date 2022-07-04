import { AddBox, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { TableActionCell } from 'src/components/TableActionCell';
import { TableHeader } from 'src/components/TableHeader';
import { useFirebase } from 'src/hooks/useFirebase';

export const SupplierList = () => {
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

      {/* Supplier List */}
      <div className="overflow-auto rounded drop-shadow">
        {storeData.suppliers && (
          <table className="table-auto w-full border-collapse bg-slate-100">
            <TableHeader columns={columns} />
            {/* Body */}
            <tbody>
              {storeData.suppliers.documents.map((data) => (
                <tr key={data.id} className="border-b transition-all">
                  {/* Action */}
                  <TableActionCell
                    onClick={handleEditClick(data.id)}
                    iconName="create"
                  />
                  {/* Name */}
                  <td className="py-2 px-4 first:pl-6 last:pr-6">
                    {data.name}
                  </td>
                  {/* Phone Number */}
                  <td className="py-2 px-4 first:pl-6 last:pr-6">
                    {data.phoneNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Content>
  );
};

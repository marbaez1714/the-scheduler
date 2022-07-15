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

export const CompanyList = () => {
  // - HOOKS - //
  const { storeData, loading, archiveStoreDocument: removeStoreDocument } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //
  const handleArchiveClick = ({ name, id }: ResponseDocument<'Company'>) => {
    confirmArchive(name) &&
      toast.promise(removeStoreDocument('Company', id), {
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
  const columns = ['', 'Company Name', 'Office Address', 'Phone Number', 'Email'];

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
        <table className="table-auto w-full border-collapse bg-slate-100 drop-shadow">
          <TableHeader columns={columns} />
          {/* Body */}
          <tbody>
            {storeData.companies.documents.map((data) => (
              <tr key={data.id} className="border-b transition-all">
                {/* Action */}
                <TableMenuCell menuActions={getMenuActions(data)} />
                {/* Name */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.name}</td>
                {/* Address */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.primaryAddress || '-'}</td>
                {/* Phone Number */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.primaryPhone || '-'}</td>
                {/* Address */}
                <td className="py-2 px-4 first:pl-6 last:pr-6">{data.primaryEmail || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Content>
  );
};

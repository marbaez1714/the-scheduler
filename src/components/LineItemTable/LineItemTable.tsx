import { useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { LineItemTableProps } from './types';

const LineItemTable = ({ lineItems, onRemove }: LineItemTableProps) => {
  // - HOOKS - //
  const {
    storeData: { suppliers },
  } = useFirebase();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //
  const handleRemoveClick = (index: number) => () => {
    onRemove(index);
  };

  const supplierNames = useMemo(() => {
    const namesById: Record<string, string> = {};

    if (suppliers) {
      suppliers.documents.forEach((item) => (namesById[item.id] = item.name));
    }

    return namesById;
  }, [suppliers]);

  // - JSX - //
  return (
    <div className="bg-slate-200 rounded shadow-sm px-4 py-2">
      <table className="text-left w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="pl-6 pr-4 py-2">Order #</th>
            <th className="px-4 py-2">Supplier</th>
            <th className="pl-4 pr-6 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr
              className="hover:bg-slate-100 hover:shadow transition-all rounded"
              key={item.orderNumber + item.supplierId + index}
            >
              <td className="pl-6 pr-4 py-2 rounded-l">{item.orderNumber}</td>
              <td className="px-4 py-2">{supplierNames[item.supplierId]}</td>
              <td className="pl-4 pr-6 py-2 text-right rounded-r">
                <IconButton
                  className="text-sm"
                  size="small"
                  onClick={handleRemoveClick(index)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineItemTable;

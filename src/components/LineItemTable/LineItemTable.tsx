import { useMemo } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { LineItemTableProps } from './types';
import { useGetLineItemTableSuppliersQuery } from 'src/api';

const LineItemTable = ({ lineItems, onRemove }: LineItemTableProps) => {
  /******************************/
  /* Data                       */
  /******************************/
  const { data: suppliersData } = useGetLineItemTableSuppliersQuery({ fetchPolicy: 'cache-only' });

  /******************************/
  /* Memos                      */
  /******************************/
  const supplierNames = useMemo(() => {
    const namesById: Record<string, string> = {};

    if (suppliersData?.suppliers) {
      suppliersData?.suppliers.data.forEach((item) => (namesById[item.id] = item.name));
    }

    return namesById;
  }, [suppliersData]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleRemoveClick = (index: number) => () => {
    onRemove(index);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="px-4 py-2 rounded bg-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse table-auto">
        <thead>
          <tr>
            <th className="py-2 pl-6 pr-4">Order #</th>
            <th className="px-4 py-2">Supplier</th>
            <th className="py-2 pl-4 pr-6"></th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr
              className="rounded hover:bg-slate-100 hover:shadow transition-all"
              key={item.orderNumber + item.supplierId + index}
            >
              <td className="py-2 pl-6 pr-4 rounded-l">{item.orderNumber}</td>
              <td className="px-4 py-2">{supplierNames[item.supplierId]}</td>
              <td className="py-2 pl-4 pr-6 text-right rounded-r">
                <IconButton className="text-sm" size="small" onClick={handleRemoveClick(index)}>
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

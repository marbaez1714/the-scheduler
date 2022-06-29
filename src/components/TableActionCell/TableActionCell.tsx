import { Icon } from '@mui/material';
import { TableActionCellProps } from './types';

const TableActionCell = ({ onClick, iconName }: TableActionCellProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <td className="py-2 px-4 first:pl-6 last:pr-6">
      <button className="flex" onClick={onClick}>
        <Icon>{iconName}</Icon>
      </button>
    </td>
  );
};

export default TableActionCell;

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
    <td className="p-0">
      <button>
        <Icon>{iconName}</Icon>
      </button>
    </td>
  );
};

export default TableActionCell;

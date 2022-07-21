import { HeaderCellProps } from './types';

export const HeaderCell = ({ title, subtitle }: HeaderCellProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <div>
      <p>{title}</p>
      {subtitle && <p className="text-xs">{subtitle}</p>}
    </div>
  );
};

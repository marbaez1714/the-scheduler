import { TableHeaderProps } from './types';

const TableHeader = ({ columns }: TableHeaderProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <thead className="text-left text-white font-medium whitespace-nowrap">
      {/* Header Row */}
      <tr className="bg-slate-600">
        {/* Columns */}
        {columns.map((item, index) => (
          <th className="py-2 px-4 first:pl-6 last:pr-6" key={index}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

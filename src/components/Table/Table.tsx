import { ChangeEventHandler, useState } from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import cn from 'classnames';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  Header,
  Cell,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { DataIdCell } from './Cells/DataIdCell';
import { DateCell } from './Cells/DateCell';
import { RowMenuCell } from './Cells/RowMenuCell';
import { TextCell } from './Cells/TextCell';
import { PhoneNumberCell } from './Cells/PhoneNumberCell';
import { TimestampCell } from './Cells/TimestampCell';
import { HeaderCell } from './Cells/HeaderCell';
import { TableProps } from './types';

const Table = <TData extends Record<string, unknown>>({
  title,
  data,
  columns,
  total,
  rowActions,
}: TableProps<TData>) => {
  /******************************/
  /* State                      */
  /******************************/
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const globalFilterFn: FilterFn<TData> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGlobalFilter(e.target.value);
  };

  /******************************/
  /* Table                      */
  /******************************/
  const { getHeaderGroups, getRowModel } = useReactTable({
    state: { sorting, globalFilter },
    data,
    columns,
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  /******************************/
  /* Render                     */
  /******************************/
  const renderHeaderCell = (h: Header<TData, unknown>, hIndex: number) => {
    const spanActions = rowActions && hIndex === 0;
    const canSort = h.column.getCanSort();
    const isSorted = h.column.getIsSorted();
    const colSpan = spanActions ? h.colSpan + 1 : h.colSpan;
    const sortDirection = h.column.getIsSorted();

    return (
      <th
        className={cn(
          'h-14 py-2 px-3 first:pl-4 last:pr-4 font-medium transition-all relative',
          {
            'cursor-pointer select-none hover:bg-app-dark pr-9': canSort,
            'bg-app-dark': isSorted,
            'first:pl-14': spanActions,
          }
        )}
        onClick={h.column.getToggleSortingHandler()}
        colSpan={colSpan}
        key={h.id}
      >
        {!h.isPlaceholder && (
          <>
            {flexRender(h.column.columnDef.header, h.getContext())}
            {!!sortDirection && (
              <div className="absolute top-0 flex items-center w-4 h-full right-2 y-6">
                {sortDirection === 'asc' && <ChevronDownIcon />}
                {sortDirection === 'desc' && <ChevronUpIcon />}
              </div>
            )}
          </>
        )}
      </th>
    );
  };

  const renderHeaderGroups = () => {
    return getHeaderGroups().map((hg) => (
      <tr key={hg.id}>{hg.headers.map(renderHeaderCell)}</tr>
    ));
  };

  const renderBodyCell = (getCells: () => Cell<TData, unknown>[]) => {
    return getCells().map(({ id, column, getContext, getValue }) => (
      <td className="px-3 py-2 first:pl-4 last:pr-4 " key={id}>
        {getValue() ? (
          flexRender(column.columnDef.cell, getContext())
        ) : (
          <span className="text-xs text-app-text/25">(empty)</span>
        )}
      </td>
    ));
  };

  const renderBodyRows = () => {
    const { rows } = getRowModel();

    if (rows.length < 1) {
      return (
        <tr className="transition-all border-b last:border-b-0 text-app-text/25">
          <td className="px-6 py-4 text-lg text-center" colSpan={100}>
            (No results)
          </td>
        </tr>
      );
    }

    return rows.map(({ id, original, getVisibleCells }) => (
      <tr
        className="relative transition-all border-b last:border-b-0 last:rounded-b"
        key={id}
      >
        <RowMenuCell menuActions={rowActions} data={original} />
        {renderBodyCell(getVisibleCells)}
      </tr>
    ));
  };

  return (
    <div className="flex flex-col w-full shadow-lg">
      {/******************************/}
      {/* Table Header               */}
      {/******************************/}
      <div className="flex items-center py-6 pl-10 pr-6 border-b border-b-app-medium bg-app">
        {/******************************/}
        {/* Title                      */}
        {/******************************/}
        <div className="flex items-end basis-2/3">
          <h1 className="text-4xl font-semibold tracking-wide text-app-altText">
            {title}
          </h1>
          <p className="ml-4 opacity-50 text-app-altText">{total} items</p>
        </div>
        {/******************************/}
        {/* Search                     */}
        {/******************************/}
        <input
          placeholder="Search"
          onChange={handleSearchChange}
          value={globalFilter}
          className="p-2 rounded shadow basis-1/3 bg-app-light"
        />
      </div>
      {/******************************/}
      {/* Table                      */}
      {/******************************/}
      <div className="overflow-x-scroll whitespace-nowrap">
        <table className="w-full border-collapse shadow-lg table-auto">
          {/******************************/}
          {/* Table Header               */}
          {/******************************/}
          <thead className="text-left text-app-altText bg-app">
            {/******************************/}
            {/* Column Headers             */}
            {/******************************/}
            {renderHeaderGroups()}
          </thead>
          {/******************************/}
          {/* Table Body                 */}
          {/******************************/}
          <tbody className="bg-app-light">
            {/******************************/}
            {/* Data / Empty Rows          */}
            {/******************************/}
            {renderBodyRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.HeaderCell = HeaderCell;
Table.DateCell = DateCell;
Table.DataIdCell = DataIdCell;
Table.TextCell = TextCell;
Table.PhoneNumberCell = PhoneNumberCell;
Table.TimestampCell = TimestampCell;

export default Table;

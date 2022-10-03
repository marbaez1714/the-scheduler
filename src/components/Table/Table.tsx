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
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { DataIdCell } from './Cells/DataIdCell';
import { DateCell } from './Cells/DateCell';
import { RowMenuCell } from './Cells/RowMenuCell';
import { TextCell } from './Cells/TextCell';
import { PhoneNumberCell } from './Cells/PhoneNumberCell';
import { TimestampCell } from './Cells/TimestampCell';
import { HeaderCell } from './Cells/HeaderCell';
import { JobLegacyStatusCell } from './Cells/JobLegacyStatusCell';
import { PaginationFooter } from './PaginationFooter';
import { TableProps } from './types';
import { Collapsable } from '../Collapsable';

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
  const {
    getHeaderGroups,
    getRowModel,
    setPageSize,
    getState,
    setPageIndex,
    getPageCount,
  } = useReactTable({
    state: { sorting, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    data,
    columns,
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

    return rows.map(({ id: rowId, original, getVisibleCells }) => (
      <tr
        className="relative transition-all border-b last:border-b-0 last:rounded-b"
        key={rowId}
      >
        <RowMenuCell menuActions={rowActions} data={original} />
        {getVisibleCells().map(
          ({ id: cellId, column, getContext, getValue }) => (
            <td className="px-3 py-2 first:pl-4 last:pr-4 " key={cellId}>
              {getValue() ? (
                flexRender(column.columnDef.cell, getContext())
              ) : (
                <span className="text-xs text-app-text/25">(empty)</span>
              )}
            </td>
          )
        )}
      </tr>
    ));
  };

  return (
    <Collapsable
      defaultOpen
      title={title}
      subtitle={`${total}`}
      rightRender={
        <input
          placeholder="Search"
          onChange={handleSearchChange}
          value={globalFilter}
          className="p-2 rounded shadow-inner basis-1/3 bg-app-light"
        />
      }
      footerRender={
        <PaginationFooter
          totalRows={total}
          totalPages={getPageCount()}
          onPageSizeChange={setPageSize}
          onPageChange={setPageIndex}
          {...getState().pagination}
        />
      }
    >
      <table className="w-full border-collapse table-auto">
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
    </Collapsable>
  );
};

Table.HeaderCell = HeaderCell;
Table.DateCell = DateCell;
Table.DataIdCell = DataIdCell;
Table.TextCell = TextCell;
Table.PhoneNumberCell = PhoneNumberCell;
Table.TimestampCell = TimestampCell;
Table.JobLegacyStatusCell = JobLegacyStatusCell;

export default Table;

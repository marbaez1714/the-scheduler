import { useEffect, useState } from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import cn from 'classnames';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  Header,
  getPaginationRowModel,
  Updater,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { DataIdCell } from './Cells/DataIdCell';
import { DateCell } from './Cells/DateCell';
import { TextCell } from './Cells/TextCell';
import { PhoneNumberCell } from './Cells/PhoneNumberCell';
import { TimestampCell } from './Cells/TimestampCell';
import { HeaderCell } from './Cells/HeaderCell';
import { JobLegacyStatusCell } from './Cells/JobLegacyStatusCell';
import { TableProps } from './types';
import { TableFooter } from './TableFooter';
import { MenuCell } from './Cells/MenuCell';

const Table = <TData extends Record<string, unknown>>({
  data = [],
  columns,
  pageCount,
  headerRender,
  onPaginationChange,
  onSortingChange,
}: TableProps<TData>) => {
  /******************************/
  /* State                      */
  /******************************/
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sortingState, setSortingState] = useState<SortingState>([]);

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

  const handlePageChange = (pageIndex: number) => {
    setPageIndex(pageIndex);
  };

  const handlePageSizeChange = (size: number) => {
    resetPageIndex();
    setPageSize(size);
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setPaginationState(updater);
    if (typeof updater === 'function') {
      onPaginationChange?.(updater(paginationState));
    }
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    setSortingState(updater);

    if (typeof updater === 'function') {
      onSortingChange?.(updater(sortingState));
    }
  };

  /******************************/
  /* Effects                    */
  /******************************/

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
    resetPageIndex,
  } = useReactTable({
    state: { pagination: paginationState, sorting: sortingState },
    data,
    columns,
    pageCount,
    globalFilterFn,
    manualPagination: !!onPaginationChange,
    manualSorting: !!onSortingChange,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pagination } = getState();

  /******************************/
  /* Render                     */
  /******************************/
  const renderHeaderCell = (h: Header<TData, unknown>) => {
    const canSort = h.column.getCanSort();
    const isSorted = h.column.getIsSorted();
    const sortDirection = h.column.getIsSorted();

    return (
      <th
        className={cn(
          'h-10 py-2 px-3 first:pl-4 last:pr-4 font-medium transition-all relative uppercase text-xs',
          {
            'cursor-pointer select-none hover:bg-app-dark pr-9': canSort,
            'bg-app-dark': isSorted,
          }
        )}
        onClick={h.column.getToggleSortingHandler()}
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

  const renderBodyRows = () => {
    const { rows } = getRowModel();

    if (rows.length < 1) {
      return (
        <tr className="h-12 border-b last:border-b-0">
          <td
            className="px-3 py-2 text-center first:pl-4 last:pr-4"
            colSpan={100}
          >
            No results
          </td>
        </tr>
      );
    }

    return rows.map(({ id: rowId, getVisibleCells }) => (
      <tr className="h-12 transition-all border-y" key={rowId}>
        {getVisibleCells().map(
          ({ id: cellId, column, getContext, getValue }) => (
            <td className="px-3 first:pl-4 last:pr-4" key={cellId}>
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
    <div className="flex flex-col w-full max-h-full overflow-hidden rounded shadow">
      {headerRender && (
        <div className="px-6 py-4 border-b bg-app border-b-app-medium">
          {headerRender}
        </div>
      )}

      {/* Table */}
      <div className={'overflow-scroll'}>
        <table className="relative w-full border-collapse whitespace-nowrap">
          {/******************************/}
          {/* Table Header               */}
          {/******************************/}
          <thead className="text-left text-app-altText bg-app">
            {/******************************/}
            {/* Column Headers             */}
            {/******************************/}
            {getHeaderGroups().map((hg) => (
              <tr key={hg.id}>{hg.headers.map(renderHeaderCell)}</tr>
            ))}
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
      {/* Footer */}
      <TableFooter
        totalPages={pageCount || getPageCount()}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        {...pagination}
      />
    </div>
  );
};

Table.HeaderCell = HeaderCell;
Table.DateCell = DateCell;
Table.DataIdCell = DataIdCell;
Table.TextCell = TextCell;
Table.PhoneNumberCell = PhoneNumberCell;
Table.TimestampCell = TimestampCell;
Table.JobLegacyStatusCell = JobLegacyStatusCell;
Table.MenuCell = MenuCell;

export default Table;

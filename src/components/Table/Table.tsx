import { ChangeEventHandler, useRef, useState } from 'react';
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
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { DataIdCell } from './Cells/DataIdCell';
import { DateCell } from './Cells/DateCell';
import { RowActionCell } from './Cells/RowActionCell';
import { TextCell } from './Cells/TextCell';
import { PhoneNumberCell } from './Cells/PhoneNumberCell';
import { TimestampCell } from './Cells/TimestampCell';
import { HeaderCell } from './Cells/HeaderCell';
import { JobLegacyStatusCell } from './Cells/JobLegacyStatusCell';
import { TableProps } from './types';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';

const Table = <TData extends Record<string, unknown>>({
  data = [],
  total = 0,
  columns,
  rowActions,
  pageCount,
  loading,
  onPaginationChange,
  onPageSizeChange,
  tableAction,
  manualPagination,
}: TableProps<TData>) => {
  /******************************/
  /* State                      */
  /******************************/
  const [globalFilter, setGlobalFilter] = useState('');

  /******************************/
  /* Refs                       */
  /******************************/
  const containerRef = useRef<HTMLDivElement>(null);

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

  const scrollToTable = () => {
    if (containerRef.current) {
      const { top } = containerRef.current.getBoundingClientRect();
      window.scrollBy({ top: top - 64, behavior: 'smooth' }); // top + header offset
    }
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGlobalFilter(e.target.value);
  };

  const handlePageChange = (pageIndex: number) => {
    scrollToTable();
    setPageIndex(pageIndex);
    onPaginationChange && onPaginationChange(pageIndex);
  };

  const handlePageSizeChange = (size: number) => {
    scrollToTable();
    setPageSize(size);
    onPageSizeChange && onPageSizeChange(size);
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
    state: { globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    data,
    columns,
    pageCount,
    globalFilterFn,
    manualPagination,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pagination } = getState();

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
          'h-6 py-1 px-3 first:pl-4 last:pr-4 font-medium transition-all relative uppercase text-xs',
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

    if (loading) {
      return (
        <>
          <tr className="h-12 text-xs border-y">
            <td className="px-3 py-2 first:pl-4 last:pr-4" colSpan={100}>
              <p>(Loading)</p>
            </td>
          </tr>
          {Array.from(
            { length: getState().pagination.pageSize - 1 },
            (_, index) => (
              <tr className="h-12 border-b last:border-b-0" key={index}>
                <td className="px-3 py-2 first:pl-4 last:pr-4" />
              </tr>
            )
          )}
        </>
      );
    }

    if (rows.length < 1) {
      return (
        <tr className="h-12 text-xs border-y">
          <td className="px-6 py-4 text-lg" colSpan={100}>
            (No results)
          </td>
        </tr>
      );
    }

    return rows.map(({ id: rowId, original, getVisibleCells }) => (
      <tr className="h-12 transition-all border-y" key={rowId}>
        {rowActions && (
          <RowActionCell menuActions={rowActions} data={original} />
        )}
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
    <div
      className="flex flex-col w-full max-h-full overflow-hidden rounded shadow"
      ref={containerRef}
    >
      {/* Header */}
      <TableHeader
        searchTerm={globalFilter}
        onSearchChange={handleSearchChange}
        tableAction={tableAction}
      />
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
      {/* Footer */}
      <TableFooter
        totalRows={total}
        totalPages={pageCount ?? getPageCount()}
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

export default Table;

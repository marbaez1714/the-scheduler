import { useState, useEffect, useMemo, Fragment } from 'react';
import cn from 'classnames';
import { RadioGroup } from '@headlessui/react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

import { PaginationFooterProps } from './types';

export const PaginationFooter = ({
  tableState,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationFooterProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const pageSizeOptions = [16, 32, 64];
  const currentPage = tableState.pagination.pageIndex + 1;
  const disablePrevious = tableState.pagination.pageIndex === 0;
  const disableNext = tableState.pagination.pageIndex === totalPages - 1;

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handlePageChange =
    (direction: 'prev' | 'next' | 'first' | 'last') => () => {
      const currentIndex = tableState.pagination.pageIndex;

      switch (direction) {
        case 'first':
          onPageChange(0);
          break;
        case 'last':
          onPageChange(totalPages - 1);
          break;
        case 'next':
          onPageChange(currentIndex + 1);
          break;
        case 'prev':
          onPageChange(currentIndex - 1);
          break;
      }
    };

  /******************************/
  /* Render                     */
  /******************************/

  return (
    <div className="flex justify-between px-6 py-4 border-t shadow bg-app border-t-app-medium">
      {/******************************/}
      {/* Rows shown                 */}
      {/******************************/}
      <RadioGroup
        className="flex items-center text-sm leading-6 text-app-altText"
        value={tableState.pagination.pageSize}
        onChange={onPageSizeChange}
      >
        <RadioGroup.Label className="mr-2">Items shown:</RadioGroup.Label>
        <div className="flex overflow-hidden rounded">
          {pageSizeOptions.map((value) => (
            <RadioGroup.Option
              className={({ checked }) =>
                cn(
                  'px-2 text-center cursor-pointer bg-app-dark hover:bg-app-darkest',
                  { 'bg-app-darkest': checked }
                )
              }
              value={value}
              key={value}
            >
              {value}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {/******************************/}
      {/* Page Buttons               */}
      {/******************************/}
      <div className="flex items-center text-sm shadow text-app-altText">
        {/* Page Back Buttons */}
        <button
          className="w-6 h-6 p-1 border-r rounded-l bg-app-dark hover:bg-app-darkest text-app-altText border-r-app-light disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePageChange('first')}
          disabled={disablePrevious}
        >
          <ChevronDoubleLeftIcon />
        </button>
        <button
          className="w-6 h-6 p-1 border-r bg-app-dark hover:bg-app-darkest text-app-altText border-r-app-light disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePageChange('prev')}
          disabled={disablePrevious}
        >
          <ChevronLeftIcon />
        </button>

        {/* Current Page */}
        <div className="flex items-center justify-center h-6 px-2 transition-all pointer-events-none bg-app-medium text-app-text">
          {currentPage} / {totalPages}
        </div>

        {/* Page Next Buttons */}
        <button
          className="w-6 h-6 p-1 border-l border-l-app-light bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePageChange('next')}
          disabled={disableNext}
        >
          <ChevronRightIcon />
        </button>
        <button
          className="w-6 h-6 p-1 border-l rounded-r border-l-app-light bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePageChange('last')}
          disabled={disableNext}
        >
          <ChevronDoubleRightIcon />
        </button>
      </div>
    </div>
  );
};

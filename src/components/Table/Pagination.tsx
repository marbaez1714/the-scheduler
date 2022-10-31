import cn from 'classnames';
import { RadioGroup } from '@headlessui/react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

import { PaginationProps } from './types';
import { TextInput } from '../TextInput';

export const Pagination = ({
  pageIndex,
  pageSize,
  totalPages,
  totalRows,
  searchTerm,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
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
  const currentPage = pageIndex + 1;
  const disablePrevious = pageIndex === 0;
  const disableNext = pageIndex === totalPages - 1;
  const pageSizeOptions = [...new Set([10, 25, 50, totalRows])].filter(
    (opt) => opt <= totalRows
  );

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size);
    onPageChange(0);
  };

  const handlePageChange =
    (direction: 'prev' | 'next' | 'first' | 'last') => () => {
      const currentIndex = pageIndex;

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
    <div className="flex border-b bg-app border-b-app-medium">
      <div className="flex items-center justify-center gap-4 px-6 py-2">
        {/******************************/}
        {/* Page Buttons               */}
        {/******************************/}
        {totalPages > 1 && (
          <div className='flex items-center'>
            <p className='mr-2 text-sm text-app-altText'>Page:</p>
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
        )}
        {/******************************/}
        {/* Rows shown                 */}
        {/******************************/}
        <RadioGroup
          className="flex items-center text-sm leading-6 text-app-altText"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <RadioGroup.Label className="mr-2">Items shown:</RadioGroup.Label>
          <div className="flex overflow-hidden rounded">
            {pageSizeOptions.map((value) => (
              <RadioGroup.Option
                className={({ checked }) =>
                  cn(
                    'px-2 flex items-center justify-center cursor-pointer bg-app-dark hover:bg-app-darkest',
                    { 'bg-app-darkest underline': checked }
                  )
                }
                value={value}
                key={value}
              >
                {value === totalRows ? `All - ${totalRows}` : value}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center flex-grow px-6 py-4">
        <TextInput
          className="w-1/2 py-2 ml-auto"
          onChange={onSearchChange}
          value={searchTerm}
          placeholder="Search Term"
        />
      </div>
    </div>
  );
};
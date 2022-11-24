import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import cn from 'classnames';

import { TableFooterProps } from './types';
import { RadioGroup } from '@headlessui/react';

export const TableFooter = ({
  pageSize,
  pageIndex,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: TableFooterProps) => {
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
  const pageSizeOptions = [10, 25, 50];

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

  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex px-6 py-2 bg-app">
      {/* Page Size */}
      <RadioGroup
        className="flex items-center h-full text-sm border rounded text-app-altText border-app-medium"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        <div className="flex overflow-hidden rounded">
          {pageSizeOptions.map((value) => (
            <RadioGroup.Option
              className={cn(
                'py-0.5 px-2 flex items-center justify-center cursor-pointer hover:bg-app-darkest focus-ring',
                { 'bg-app': pageSize !== value },
                { 'bg-app-darkest': pageSize === value }
              )}
              value={value}
              key={value}
            >
              {value}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {/* Pagination */}
      <div className="flex items-center ml-auto overflow-hidden border rounded border-app-medium">
        <div className="flex items-center text-sm shadow text-app-altText">
          {/* Page Back Buttons */}
          <button
            className="w-6 h-6 p-1 bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none focus-ring"
            onClick={handlePageChange('first')}
            disabled={disablePrevious}
          >
            <ChevronDoubleLeftIcon />
          </button>
          <button
            className="w-6 h-6 p-1 bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none focus-ring"
            onClick={handlePageChange('prev')}
            disabled={disablePrevious}
          >
            <ChevronLeftIcon />
          </button>

          {/* Current Page */}
          <div className="flex items-center justify-center w-20 h-6 transition-all pointer-events-none bg-app-medium text-app-text">
            {currentPage} / {totalPages}
          </div>

          {/* Page Next Buttons */}
          <button
            className="w-6 h-6 p-1 bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none focus-ring"
            onClick={handlePageChange('next')}
            disabled={disableNext}
          >
            <ChevronRightIcon />
          </button>
          <button
            className="w-6 h-6 p-1 bg-app-dark hover:bg-app-darkest text-app-altText disabled:opacity-50 disabled:pointer-events-none focus-ring"
            onClick={handlePageChange('last')}
            disabled={disableNext}
          >
            <ChevronDoubleRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

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
  /* Data                       */
  /******************************/
  const currentPage = pageIndex + 1;
  const disablePrevious = pageIndex === 0;
  const disableNext = pageIndex === totalPages - 1;
  const pageSizeOptions = [10, 25, 50];

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
    <div className="flex flex-col items-center gap-4 gradient-br-app px-6 py-2 md:flex-row">
      {/* Page Size */}
      <RadioGroup
        className="flex h-full items-center rounded border border-app-medium text-sm text-app-altText"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        <div className="flex overflow-hidden rounded">
          {pageSizeOptions.map((value) => (
            <RadioGroup.Option
              className={cn(
                'focus-ring flex cursor-pointer items-center justify-center py-0.5 px-2 hover:bg-app-darkest',
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
      <div className="flex items-center overflow-hidden rounded border border-app-medium md:ml-auto">
        <div className="flex items-center text-sm text-app-altText shadow">
          {/* Page Back Buttons */}
          <button
            className="focus-ring h-6 w-6 bg-app-dark p-1 text-app-altText hover:bg-app-darkest disabled:pointer-events-none disabled:opacity-50"
            onClick={handlePageChange('first')}
            disabled={disablePrevious}
          >
            <ChevronDoubleLeftIcon />
          </button>
          <button
            className="focus-ring h-6 w-6 bg-app-dark p-1 text-app-altText hover:bg-app-darkest disabled:pointer-events-none disabled:opacity-50"
            onClick={handlePageChange('prev')}
            disabled={disablePrevious}
          >
            <ChevronLeftIcon />
          </button>

          {/* Current Page */}
          <div className="pointer-events-none flex h-6 w-20 items-center justify-center bg-app-medium text-app-text transition-all">
            {currentPage} / {totalPages}
          </div>

          {/* Page Next Buttons */}
          <button
            className="focus-ring h-6 w-6 bg-app-dark p-1 text-app-altText hover:bg-app-darkest disabled:pointer-events-none disabled:opacity-50"
            onClick={handlePageChange('next')}
            disabled={disableNext}
          >
            <ChevronRightIcon />
          </button>
          <button
            className="focus-ring h-6 w-6 bg-app-dark p-1 text-app-altText hover:bg-app-darkest disabled:pointer-events-none disabled:opacity-50"
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

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
  onPageSizeChange,
  pageSize,
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

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

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
        value={pageSize}
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
        <button className="w-6 h-6 p-1 border-r rounded-l bg-app-dark hover:bg-app-darkest text-app-altText border-r-app-light">
          <ChevronDoubleLeftIcon />
        </button>
        <button className="w-6 h-6 p-1 border-r bg-app-dark hover:bg-app-darkest text-app-altText border-r-app-light">
          <ChevronLeftIcon />
        </button>
        <button className="w-6 h-6 bg-app-dark hover:bg-app-darkest">2</button>
        <div className="flex items-center justify-center w-6 h-6 transition-all pointer-events-none bg-app-medium text-app-text">
          3
        </div>
        <button className="w-6 h-6 bg-app-dark hover:bg-app-darkest">4</button>
        <button className="w-6 h-6 p-1 border-l border-l-app-light bg-app-dark hover:bg-app-darkest text-app-altText">
          <ChevronRightIcon />
        </button>
        <button className="w-6 h-6 p-1 border-l rounded-r border-l-app-light bg-app-dark hover:bg-app-darkest text-app-altText">
          <ChevronDoubleRightIcon />
        </button>
      </div>
    </div>
  );
};

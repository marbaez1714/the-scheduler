import { useState, useEffect, useMemo, forwardRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import cn from 'classnames';

import { MultiSelectInputProps } from './types';
import { CheckIcon } from '@heroicons/react/24/solid';

const MultiSelectInput = ({
  label,
  className,
  required,
  options,
  value,
  onChange,
  errorMessage,
  name,
  onBlur,
  placeholder,
}: MultiSelectInputProps) => {
  /******************************/
  /* Memos                      */
  /******************************/
  const displayedValues = useMemo(() => {
    return '';
  }, []);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col flex-grow">
      <Listbox value={value} onChange={onChange} multiple name={name}>
        {/******************************/}
        {/* Label                      */}
        {/******************************/}
        {label && (
          <Listbox.Label className="block mb-2 font-medium text-app-dark">
            {label}
            {required && (
              <span className="ml-1 font-bold text-app-error">*</span>
            )}
          </Listbox.Label>
        )}

        <Listbox.Button
          className={cn(
            'bg-app-light py-3 pl-4 pr-12 w-full rounded border-2 border-app-medium shadow-inner text-ellipsis',
            className
          )}
        >
          {displayedValues || placeholder || 'Select'}
        </Listbox.Button>
        {/******************************/}
        {/* Options                    */}
        {/******************************/}
        <Transition
          className="z-50"
          enter="transition duration-100 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
          afterLeave={onBlur}
        >
          <Listbox.Options className="absolute z-10 mt-2 overflow-y-scroll border-2 divide-y rounded shadow-2xl w-96 border-app-medium bg-app-light max-h-48">
            {/******************************/}
            {/* No Results                 */}
            {/******************************/}
            {options.length === 0 && <li className="px-4 py-3">No results</li>}
            {/******************************/}
            {/* Select Options             */}
            {/******************************/}
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ selected, active }) =>
                  cn(
                    'px-4 py-3 hover:bg-app-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis transition-all flex items-center',
                    {
                      'bg-app text-app-altText hover:text-app-text': selected,
                      'bg-app-medium': active && !selected,
                    }
                  )
                }
              >
                {({ selected }) => (
                  <>
                    {selected && <CheckIcon className="w-4 h-4 mr-2" />}
                    {option.label}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      {!!errorMessage && (
        <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
      )}
    </div>
  );
};

export default MultiSelectInput;

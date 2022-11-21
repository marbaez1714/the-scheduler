import { useState, useMemo, forwardRef } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import cn from 'classnames';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

import { AutocompleteInputProps } from './types';

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    {
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
      disabled,
      icon,
    },
    ref
  ) => {
    /******************************/
    /* State                      */
    /******************************/
    const [query, setQuery] = useState('');

    /******************************/
    /* Memos                      */
    /******************************/
    const filteredOptions = useMemo(() => {
      const displayOptions = options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

      return query ? displayOptions : options;
    }, [query, options]);

    const getDisplayedValue = () => {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption?.label ?? '';
    };

    /******************************/
    /* Callbacks                  */
    /******************************/
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };

    const handleInputBlur = () => {
      onBlur?.();
      setQuery('');
    };

    const handleClearClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();

      if (value) {
        onChange(undefined);
        setQuery('');
      }
    };

    /******************************/
    /* Render                     */
    /******************************/
    return (
      <div className="relative flex flex-col flex-grow">
        <Combobox
          value={value ?? ''}
          onChange={onChange}
          name={name}
          disabled={disabled}
        >
          {/******************************/}
          {/* Label                      */}
          {/******************************/}
          {label && (
            <Combobox.Label className="block mb-2 font-medium text-app-dark">
              {label}
              {required && (
                <span className="ml-1 font-bold text-app-error">*</span>
              )}
            </Combobox.Label>
          )}

          {/******************************/}
          {/* Input                      */}
          {/******************************/}
          <div className="relative flex items-center">
            {icon && <div className="w-12 h-12 p-2 text-app">{icon}</div>}
            <Combobox.Button className="w-full">
              <Combobox.Input
                className={cn(
                  'bg-app-light h-12 pl-4 pr-12 w-full rounded border-2 border-app-medium shadow-inner text-ellipsis disabled:bg-app-medium/50 focus-ring',
                  className
                )}
                value={value ?? undefined}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                displayValue={getDisplayedValue}
                placeholder={placeholder ?? 'Select'}
                ref={ref}
              />
            </Combobox.Button>
            {/******************************/}
            {/* Clear Button               */}
            {/******************************/}
            {!disabled && (
              <button
                className="absolute w-4 h-4 right-4 text-app-dark"
                onClick={(e) => handleClearClick(e)}
                type="button"
              >
                {value ? <XMarkIcon /> : <ChevronDownIcon />}
              </button>
            )}
          </div>
          {/******************************/}
          {/* Options                    */}
          {/******************************/}
          <Combobox.Options className="absolute z-50 mt-2 overflow-visible overflow-y-scroll border-2 divide-y rounded shadow-2xl w-96 border-app-medium bg-app-light max-h-48 top-full">
            {/******************************/}
            {/* No Results                 */}
            {/******************************/}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3">No results</li>
            )}
            {/******************************/}
            {/* Select Options             */}
            {/******************************/}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option.value}
                className={({ selected, active }) =>
                  cn(
                    'px-4 py-3 hover:bg-app-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis transition-all',
                    {
                      'bg-app text-app-altText hover:text-app-text': selected,
                      'bg-app-medium': active && !selected,
                    }
                  )
                }
              >
                {option.label}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        {!!errorMessage && (
          <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default AutocompleteInput;

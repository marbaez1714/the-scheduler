import { useState, useMemo, forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import cn from 'classnames';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { AutocompleteInputProps } from './types';
import { Icon } from '../Icon';

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
        onChange(null);
        setQuery('');
      }
    };

    /******************************/
    /* Render                     */
    /******************************/
    return (
      <div className="relative flex flex-grow">
        {icon && (
          <Icon
            className="h-12 w-12 flex-shrink-0 self-end p-2 text-app"
            icon={icon}
          />
        )}
        <div className="flex w-full flex-col">
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
              <Combobox.Label className="components-input-label">
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
              <Combobox.Button className="w-full">
                <Combobox.Input
                  className={cn(
                    'focus-ring h-12 w-full text-ellipsis rounded border-2 border-app-medium bg-app-light pl-4 pr-12 shadow-inner disabled:bg-app-medium/50',
                    className
                  )}
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
                  className="absolute right-4 h-4 w-4 text-app-dark"
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
            <Combobox.Options
              className={cn(
                'absolute top-full z-50 mt-2 max-h-48 w-96 divide-y overflow-visible overflow-y-scroll rounded border-2 border-app-medium bg-app-light uppercase shadow-2xl',
                { 'ml-12': icon }
              )}
            >
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
                      'cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-4 py-3 transition-all hover:bg-app-medium',
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
      </div>
    );
  }
);

export default AutocompleteInput;

import { useState, useMemo, forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import cn from 'classnames';

import { AutocompleteInputProps } from './types';
import { Icon } from '../Icon';

//#region - Component

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(
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
    forwardedRef
  ) => {
    //#region - State

    const [query, setQuery] = useState('');

    //#endregion
    //#region - Memos

    const filteredOptions = useMemo(() => {
      if (!query) {
        return options;
      }

      return options.filter(({ label }) =>
        label.toLowerCase().includes(query.toLowerCase())
      );
    }, [query, options]);

    //#endregion
    //#region - Callbacks

    const getDisplayedValue = () => {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption?.label ?? '';
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ) => {
      setQuery(e.target.value);
    };

    const handleInputBlur = () => {
      onBlur?.();
      setQuery('');
    };

    const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      e.stopPropagation();

      if (value) {
        onChange(null);
        setQuery('');
      }
    };

    //#endregion
    //#region - Render

    return (
      <div className={cn('flex flex-grow flex-col', className)}>
        <Combobox
          value={value ?? ''}
          onChange={onChange}
          name={name}
          disabled={disabled}
        >
          {/* Label */}
          {label && (
            <Combobox.Label
              className="mb-1 self-start font-medium text-app-dark"
              htmlFor={name}
            >
              {label}
              {required && (
                <span className="ml-1 font-bold text-app-error">*</span>
              )}
            </Combobox.Label>
          )}

          {/* Input Wrapper */}
          <div className="relative flex w-full flex-grow self-start">
            {/* Icon */}
            {icon && (
              <Icon
                className="absolute ml-0.5 h-10 w-10 flex-shrink-0 p-2 text-app-medium"
                icon={icon}
              />
            )}

            {/* Input */}
            <Combobox.Button className="w-full">
              <Combobox.Input
                className={cn(
                  'focus-ring box-border h-10 w-full text-ellipsis rounded border-2 border-app-medium bg-app-light pr-2 text-app-text shadow-inner',
                  { 'pl-10': icon, 'pl-2': !icon }
                )}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                displayValue={getDisplayedValue}
                placeholder={placeholder ?? 'Select'}
                ref={forwardedRef}
              />
            </Combobox.Button>

            {/* Icon right */}
            {!disabled && (
              <button
                className="absolute right-0 mr-0.5 h-10 w-10 p-3 text-app-dark"
                onClick={handleClearClick}
                type="button"
              >
                <Icon icon={value ? 'remove' : 'chevronDown'} />
              </button>
            )}

            {/* Options */}
            <Combobox.Options className="absolute top-full z-50 mt-1 max-h-48 w-full divide-y overflow-visible overflow-y-scroll rounded border-2 border-app-medium bg-app-light uppercase shadow-2xl">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3">No results</li>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option.value}
                    className={({ selected, active }) =>
                      cn(
                        'cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-4 py-3 transition-all hover:bg-app-medium',
                        {
                          'bg-app text-app-altText hover:text-app-text':
                            selected,
                          'bg-app-medium': active && !selected,
                        }
                      )
                    }
                  >
                    {option.label}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="ml-1 mt-1 text-xs text-app-error">{errorMessage}</p>
          )}
        </Combobox>
      </div>
    );

    //#endregion
  }
);

//#endregion

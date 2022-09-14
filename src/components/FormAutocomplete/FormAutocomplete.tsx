import { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import cn from 'classnames';

import { FormAutocompleteProps } from './types';
import { Icon } from '@mui/material';

const FormAutocomplete = <T extends FieldValues>({
  label,
  className,
  required,
  options,
  ...rest
}: FormAutocompleteProps<T>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field: { onChange, value, name, ref },
    fieldState: { error },
  } = useController(rest);

  /******************************/
  /* State                      */
  /******************************/
  const [query, setQuery] = useState('');

  /******************************/
  /* Memos                      */
  /******************************/
  const filteredOptions = useMemo(() => {
    return query
      ? options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        )
      : options;
  }, [query, options]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleChange = (value: string) => {
    onChange(value);
  };

  const getDisplayedValue = () => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label ?? '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputBlur = () => {
    setQuery('');
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="relative">
      <Combobox value={value} onChange={handleChange} name={name}>
        {({ open }) => (
          <>
            {/* Label */}
            <Combobox.Label className="mb-2 font-medium text-app-dark">
              {label}
              {required && (
                <span className="ml-1 font-bold text-app-error">*</span>
              )}
            </Combobox.Label>

            {/* Input */}
            <Combobox.Button className="relative w-full">
              <Combobox.Input
                value={value}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                displayValue={getDisplayedValue}
                ref={ref}
                className={cn(
                  'bg-app-light py-3 pl-4 pr-12 w-full rounded border-2 border-app-medium shadow text-ellipsis',
                  className
                )}
              />
              <Icon className="absolute m-3 top-0.5 right-0.5">
                arrow_drop_down
              </Icon>
            </Combobox.Button>
            {/* Options */}
            <Transition
              as={Combobox.Options}
              className="absolute z-10 w-full mt-2 overflow-y-scroll border-2 divide-y rounded shadow-2xl border-app-medium bg-app-light max-h-48"
              show={open && filteredOptions.length > 0}
              enter="transition duration-100 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
              static
            >
              {filteredOptions.map((option) => (
                <Combobox.Option
                  className={({ selected }) =>
                    cn(
                      'px-4 py-3 hover:bg-app-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis transition-all',
                      {
                        'bg-app text-app-altText hover:text-app-text': selected,
                      }
                    )
                  }
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Combobox.Option>
              ))}
            </Transition>
          </>
        )}
      </Combobox>
      {!!error && (
        <p className="mt-2 text-xs text-app-error">{error.message}</p>
      )}
    </div>
  );
};

export default FormAutocomplete;

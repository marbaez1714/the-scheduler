import { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import classNames from 'classnames';

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
    return query ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : options;
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
    <div className="text-slate-700 relative">
      <Combobox value={value} onChange={handleChange} name={name}>
        {({ open }) => (
          <>
            {/* Label */}
            <Combobox.Label className="font-medium mb-2 block">
              {label} {required && <span className="text-red-500 font-bold">*</span>}
            </Combobox.Label>
            {/* Input */}
            <Combobox.Button className="w-full relative">
              <Combobox.Input
                value={value}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                displayValue={getDisplayedValue}
                ref={ref}
                className={classNames(
                  'bg-slate-100 text-slate-900 py-3 pl-4 pr-12 w-full rounded border-2 border-slate-400 shadow text-ellipsis',
                  className
                )}
              />
              <Icon className="absolute m-3 top-0.5 right-0.5">arrow_drop_down</Icon>
            </Combobox.Button>
            {/* Options */}
            <Transition
              as={Combobox.Options}
              className="absolute w-full z-10 mt-2 shadow-2xl border-2 border-slate-400 bg-slate-50 max-h-48 overflow-y-scroll divide-y rounded"
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
                    classNames(
                      'px-4 py-3 hover:bg-slate-200 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis',
                      { 'bg-slate-300': selected }
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
      {!!error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
  );
};

export default FormAutocomplete;

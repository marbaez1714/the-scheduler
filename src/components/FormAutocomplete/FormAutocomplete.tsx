import { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Combobox } from '@headlessui/react';
import classNames from 'classnames';

import { FormAutocompleteProps } from './types';

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
    field: { onChange, onBlur, value, name, ref },
    fieldState: { error },
  } = useController(rest);

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [query, setQuery] = useState<string>();

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const getDisplayedValue = () => {
    const selectedOption = options.find((option) => option.value === value);

    return selectedOption?.label ?? '';
  };

  /******************************/
  /* Memos                      */
  /******************************/
  const filteredOptions = useMemo(() => {
    return query ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) : options;
  }, [query, options]);

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleChange = (value: string) => {
    onChange(value);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="text-slate-700 relative">
      <Combobox value={value} onChange={handleChange} name={name}>
        <Combobox.Label className="font-medium mb-2 block">
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </Combobox.Label>
        <Combobox.Button className="w-full">
          <Combobox.Input
            value={value}
            onBlur={onBlur}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={() => getDisplayedValue()}
            ref={ref}
            className={classNames(
              'bg-slate-100',
              'text-slate-900',
              'py-3',
              'px-4',
              'w-full',
              'rounded',
              'border-2',
              'border-slate-400',
              'shadow',
              className
            )}
          />
        </Combobox.Button>
        {filteredOptions.length > 0 && (
          <Combobox.Options as="div" className="absolute w-full z-10 p-2">
            <ul className="shadow-2xl border-2 border-slate-400 bg-slate-50 max-h-48 overflow-y-scroll divide-y rounded">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  className={({ selected }) =>
                    classNames(
                      'px-4',
                      'py-3',
                      'hover:bg-slate-200',
                      'cursor-pointer',
                      'overflow-hidden',
                      'whitespace-nowrap',
                      'text-ellipsis',
                      {
                        'bg-slate-300': selected,
                      }
                    )
                  }
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Combobox.Option>
              ))}
            </ul>
          </Combobox.Options>
        )}
      </Combobox>
      {!!error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
  );
};

export default FormAutocomplete;

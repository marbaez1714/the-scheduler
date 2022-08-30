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
    formState: { errors },
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
  }, [query]);

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
    <div className="text-slate-800 relative">
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
              'border',
              'border-slate-400',
              'shadow',
              className
            )}
          />
        </Combobox.Button>
        <Combobox.Options className="absolute bg-slate-50 w-full shadow-2xl z-10 rounded mt-2 border">
          {filteredOptions.map((option) => (
            <Combobox.Option
              className={({ selected }) =>
                classNames('px-4', 'py-3', 'border-b', 'last:border-b-0', 'hover:bg-slate-200', 'cursor-pointer', {
                  'bg-slate-300': selected,
                })
              }
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      {errors[name]?.message && <p className="text-red-500 text-xs mt-2">{errors[name].message}</p>}
    </div>
  );
};

export default FormAutocomplete;

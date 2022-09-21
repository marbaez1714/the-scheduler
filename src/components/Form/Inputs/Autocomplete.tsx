import { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import cn from 'classnames';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { AutocompleteProps } from './types';

export const Autocomplete = <T extends FieldValues>({
  label,
  className,
  required,
  options,
  ...rest
}: AutocompleteProps<T>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field: { onChange, onBlur, value, name, ref },
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

  const displayedValue = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label ?? '';
  }, [value, options]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleChange = (value: string) => {
    onChange(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputBlur = () => {
    setQuery('');
  };

  const handleClearClick = () => {
    if (value) {
      onChange('');
      setQuery('');
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col">
      <Combobox value={value} onChange={handleChange} name={name}>
        {/******************************/}
        {/* Label                      */}
        {/******************************/}
        <Combobox.Label className="block mb-2 font-medium text-app-dark">
          {label}
          {required && <span className="ml-1 font-bold text-app-error">*</span>}
        </Combobox.Label>

        {/******************************/}
        {/* Input                      */}
        {/******************************/}
        <div className="relative flex items-center">
          <Combobox.Button className="w-full">
            <Combobox.Input
              className={cn(
                'bg-app-light py-3 pl-4 pr-12 w-full rounded border-2 border-app-medium shadow text-ellipsis',
                className
              )}
              value={value}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              displayValue={() => displayedValue}
              ref={ref}
            />
          </Combobox.Button>
          {/******************************/}
          {/* Clear Button               */}
          {/******************************/}
          <button
            className="absolute w-4 h-4 right-4 text-app-dark"
            onClick={handleClearClick}
          >
            {value ? <XMarkIcon /> : <ChevronDownIcon />}
          </button>
        </div>
        {/******************************/}
        {/* Options                    */}
        {/******************************/}
        <Transition
          className="z-10"
          enter="transition duration-100 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
          afterLeave={onBlur}
        >
          <Combobox.Options className="absolute z-10 mt-2 overflow-y-scroll border-2 divide-y rounded shadow-2xl w-96 border-app-medium bg-app-light max-h-48">
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
        </Transition>
      </Combobox>
      {!!error && (
        <p className="mt-2 text-xs text-app-error">{error.message}</p>
      )}
    </div>
  );
};

{
  /* <div className="relative">
<Combobox value={value} onChange={handleChange} name={name}>
  {({ open }) => (
    <>
      {label && (
        <Combobox.Label className="mb-2 font-medium leading-6 text-app-dark">
          {label}
          {required && (
            <span className="ml-1 font-bold text-app-error">*</span>
          )}
        </Combobox.Label>
      )}

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
</div> */
}

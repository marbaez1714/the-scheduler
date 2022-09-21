import DatePicker from 'react-datepicker';
import cn from 'classnames';

import { DateInputProps } from './types';
import { FieldValues, useController } from 'react-hook-form';

export const DateInput = <TFields extends FieldValues>({
  label,
  className,
  required,
  ...rest
}: DateInputProps<TFields>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController(rest);

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
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 font-medium text-app-dark" htmlFor={field.name}>
          {label}
          {required && <span className="ml-1 font-bold text-app-error">*</span>}
        </label>
      )}

      <DatePicker
        className={cn(
          'bg-app-light',
          'text-app-text',
          'border-app-medium',
          'py-3',
          'px-4',
          'w-full',
          'rounded',
          'border-2',
          'shadow',
          'text-ellipsis',
          className
        )}
        selected={value}
        {...field}
      />
      {!!error && (
        <p className="mt-2 text-xs text-app-error">{error.message}</p>
      )}
    </div>
  );
};

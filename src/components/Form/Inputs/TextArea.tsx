import classNames from 'classnames';
import { FieldValues, useController } from 'react-hook-form';

import { TextAreaProps } from './types';

export const TextArea = <TFields extends FieldValues>({
  label,
  className,
  required,
  ...rest
}: TextAreaProps<TFields>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field,
    fieldState: { error },
  } = useController(rest);

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

      <textarea
        className={classNames(
          'bg-app-light',
          'py-3',
          'px-4',
          'w-full',
          'rounded',
          'border-2',
          'border-app-medium',
          'shadow',
          className
        )}
        id={field.name}
        {...field}
      />
      {!!error && (
        <p className="mt-2 text-xs text-app-error">{error.message}</p>
      )}
    </div>
  );
};

import { useMemo } from 'react';
import cn from 'classnames';
import { FieldValues, useController } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { maskMap, placeholderMap } from './utils';
import { FormTextInputsProp } from './types';

const FormTextInput = <T extends FieldValues>({
  label,
  className,
  required,
  mask,
  placeholder,
  ...rest
}: FormTextInputsProp<T>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  /******************************/
  /* Component                  */
  /******************************/
  const InputComponent = useMemo(() => {
    return mask ? InputMask : 'input';
  }, [mask]);

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

      <InputComponent
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
        id={field.name}
        placeholder={placeholder || (mask && placeholderMap[mask])}
        mask={mask ? maskMap[mask] : ''}
        {...field}
      />
      {!!error && (
        <p className="mt-2 text-xs text-app-error">{error.message}</p>
      )}
    </div>
  );
};

export default FormTextInput;

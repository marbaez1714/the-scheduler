import { useMemo } from 'react';
import cn from 'classnames';
import { FieldValues, useController } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { maskMap, placeholderMap } from './utils';
import { FormTextInputsProps } from './types';

const FormTextInputs = <T extends FieldValues>({
  label,
  className,
  required,
  mask,
  placeholder,
  ...rest
}: FormTextInputsProps<T>) => {
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
    <div className="flex flex-col text-slate-700">
      {label && (
        <label className="font-medium mb-2" htmlFor={field.name}>
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <InputComponent
        className={cn(
          'bg-slate-100',
          'text-slate-900',
          'py-3',
          'px-4',
          'w-full',
          'rounded',
          'border-2',
          'border-slate-400',
          'shadow',
          'text-ellipsis',
          className
        )}
        id={field.name}
        placeholder={placeholder || (mask && placeholderMap[mask])}
        mask={mask ? maskMap[mask] : ''}
        {...field}
      />
      {!!error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
  );
};

export default FormTextInputs;

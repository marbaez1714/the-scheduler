import classNames from 'classnames';
import { FieldValues, useController } from 'react-hook-form';

import { FormTextInputsProps } from './types';

const FormTextInputs = <T extends FieldValues>({ label, className, required, ...rest }: FormTextInputsProps<T>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field,
    formState: { errors },
  } = useController(rest);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col text-slate-800">
      {label && (
        <label className="font-medium mb-2" htmlFor={field.name}>
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      <input
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
        id={field.name}
        {...field}
      />
      {errors[field.name]?.message && <p className="text-red-500 text-xs mt-2">{errors[field.name].message}</p>}
    </div>
  );
};

export default FormTextInputs;

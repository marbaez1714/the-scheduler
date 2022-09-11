import classNames from 'classnames';
import { FieldValues, useController } from 'react-hook-form';

import { FormTextAreaProps } from './types';

const FormTextArea = <T extends FieldValues>({ label, className, required, ...rest }: FormTextAreaProps<T>) => {
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
    <div className="flex flex-col text-slate-700">
      {label && (
        <label className="mb-2 font-medium" htmlFor={field.name}>
          {label} {required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}
      <textarea
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
        id={field.name}
        {...field}
      />
      {errors[field.name]?.message && <p className="mt-2 text-xs text-red-500">{errors[field.name].message}</p>}
    </div>
  );
};

export default FormTextArea;

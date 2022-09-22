import { forwardRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import cn from 'classnames';

import { DateInputProps } from './types';

const DateInput = forwardRef<ReactDatePicker, DateInputProps>(
  ({ label, className, required, errorMessage, name, ...rest }, ref) => {
    /******************************/
    /* Render                     */
    /******************************/
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-2 font-medium text-app-dark" htmlFor={name}>
            {label}
            {required && (
              <span className="ml-1 font-bold text-app-error">*</span>
            )}
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
          name={name}
          ref={ref}
          {...rest}
        />
        {!!errorMessage && (
          <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default DateInput;

import { forwardRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import cn from 'classnames';

import { DateInputProps } from './types';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

const DateInput = forwardRef<ReactDatePicker, DateInputProps>(
  ({ label, className, required, errorMessage, name, ...rest }, ref) => {
    /******************************/
    /* Data                       */
    /******************************/

    /******************************/
    /* Render                     */
    /******************************/
    return (
      <div className="flex flex-grow">
        <div className="h-12 w-12 self-end p-2 text-app">
          <CalendarDaysIcon />
        </div>
        <div className="w-full">
          {label && (
            <label className="components-input-label" htmlFor={name}>
              {label}
              {required && (
                <span className="ml-1 font-bold text-app-error">*</span>
              )}
            </label>
          )}

          <div className="flex items-center">
            <DatePicker
              className={cn(
                'focus-ring h-12 w-full text-ellipsis rounded border-2 border-app-medium bg-app-light px-4 text-app-text shadow-inner',
                className
              )}
              name={name}
              ref={ref}
              {...rest}
            />
          </div>

          {!!errorMessage && (
            <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);

export default DateInput;

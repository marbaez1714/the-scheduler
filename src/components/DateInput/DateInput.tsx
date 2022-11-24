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
      <div className="flex flex-col flex-grow">
        {label && (
          <label
            className="mb-2 ml-12 font-medium text-app-dark"
            htmlFor={name}
          >
            {label}
            {required && (
              <span className="ml-1 font-bold text-app-error">*</span>
            )}
          </label>
        )}

        <div className="flex items-center">
          <div className="w-12 h-12 p-2 text-app">
            <CalendarDaysIcon />
          </div>

          <DatePicker
            className={cn(
              'bg-app-light text-app-text border-app-medium h-12 px-4 w-full rounded border-2 shadow-inner text-ellipsis focus-ring',
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
    );
  }
);

export default DateInput;

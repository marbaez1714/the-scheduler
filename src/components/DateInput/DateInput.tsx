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
          <label className="mb-2 font-medium text-app-dark" htmlFor={name}>
            {label}
            {required && (
              <span className="ml-1 font-bold text-app-error">*</span>
            )}
          </label>
        )}

        <div className="relative">
          <DatePicker
            className={cn(
              'bg-app-light text-app-text border-app-medium py-3 px-4 w-full rounded border-2 shadow-inner text-ellipsis',
              className
            )}
            name={name}
            ref={ref}
            {...rest}
          />
          <div className="absolute top-0 flex items-center h-full right-4">
            <CalendarDaysIcon className="w-4 h-4 text-app-dark" />
          </div>
        </div>

        {!!errorMessage && (
          <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default DateInput;

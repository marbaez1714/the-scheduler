import { forwardRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import cn from 'classnames';

import { DateInputProps } from './types';
import { InputLabel } from '../InputLabel';
import { Icon } from '../Icon';

//#region - Component

export const DateInput = forwardRef<ReactDatePicker, DateInputProps>(
  (
    { label, className, required, errorMessage, name, ...rest },
    forwardedRef
  ) => {
    //#region - Render

    return (
      <div className={cn('flex flex-grow flex-col', className)}>
        {/* Label */}
        {label && (
          <InputLabel className="self-start" htmlFor={name} required={required}>
            {label}
          </InputLabel>
        )}

        {/* Input Wrapper */}
        <div className="relative flex w-full flex-grow self-start">
          {/* Icon */}
          <Icon
            className="absolute z-10 ml-0.5 h-10 w-10 flex-shrink-0 p-2 text-app-medium"
            icon="calendar"
          />

          {/* Input */}
          <DatePicker
            className="focus-ring box-border h-10 w-full text-ellipsis rounded border-2 border-app-medium bg-app-light pl-10 pr-2 text-app-text shadow-inner"
            wrapperClassName="w-full"
            name={name}
            ref={forwardedRef}
            required={required}
            {...rest}
          />

          {/* Error Message */}
          {errorMessage && (
            <p className="absolute top-full ml-1 mt-1 text-xs text-app-error">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );

    //#endregion
  }
);

//#endregion

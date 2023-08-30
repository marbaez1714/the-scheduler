import { forwardRef } from 'react';
import cn from 'classnames';

import { TextAreaInputProps } from './types';
import { InputLabel } from '../InputLabel';

//#region - Component

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    { label, required, name, className, errorMessage, ...rest },
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

        <textarea
          className="focus-ring box-border w-full h-full text-ellipsis rounded border-2 border-app-medium bg-app-light p-2 text-app-text shadow-inner"
          name={name}
          required={required}
          ref={forwardedRef}
          {...rest}
        />

        {/* Error Message */}
        {errorMessage && (
          <p className="ml-1 mt-1 text-xs text-app-error">{errorMessage}</p>
        )}
      </div>
    );

    //#endregion
  }
);

//#endregion

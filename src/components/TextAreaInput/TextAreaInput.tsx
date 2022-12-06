import { forwardRef } from 'react';
import cn from 'classnames';

import { TextAreaInputProps } from './types';

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, required, name, className, errorMessage, ...rest }, ref) => {
    /******************************/
    /* Render                     */
    /******************************/
    return (
      <div className="flex flex-grow flex-col">
        {label && (
          <label className="components-input-label" htmlFor={name}>
            {label}
            {required && (
              <span className="ml-1 font-bold text-app-error">*</span>
            )}
          </label>
        )}

        <textarea
          className={cn(
            'focus-ring h-full w-full rounded border-2 border-app-medium bg-app-light py-3 px-4 shadow-inner',
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

export default TextAreaInput;

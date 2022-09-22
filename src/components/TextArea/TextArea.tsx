import { forwardRef } from 'react';
import cn from 'classnames';

import { TextAreaProps } from './types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, name, className, errorMessage, ...rest }, ref) => {
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

        <textarea
          className={cn(
            'bg-app-light',
            'py-3',
            'px-4',
            'w-full',
            'rounded',
            'border-2',
            'border-app-medium',
            'shadow',
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

export default TextArea;

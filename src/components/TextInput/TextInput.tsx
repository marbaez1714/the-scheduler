import { useMemo, forwardRef } from 'react';
import MaskInput from 'react-input-mask';
import cn from 'classnames';

import { maskMap, placeholderMap } from 'src/utils/forms';
import { TextInputProps } from './types';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      required,
      mask,
      name,
      placeholder,
      className,
      errorMessage,
      value,
      ...rest
    },
    ref
  ) => {
    /******************************/
    /* Render                     */
    /******************************/
    const InputComponent = useMemo(() => {
      return mask ? MaskInput : 'input';
    }, [mask]);

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

        <InputComponent
          className={cn(
            'bg-app-light text-app-text border-app-medium py-3 px-4 w-full rounded border-2 shadow-inner text-ellipsis',
            className
          )}
          name={name}
          placeholder={placeholder || (mask && placeholderMap[mask])}
          mask={mask ? maskMap[mask] : ''}
          ref={ref}
          value={value ?? ''}
          {...rest}
        />
        {!!errorMessage && (
          <p className="mt-2 text-xs text-app-error">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default TextInput;

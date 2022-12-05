import { useMemo, forwardRef } from 'react';
import MaskInput from 'react-input-mask';
import cn from 'classnames';

import { maskMap, placeholderMap } from 'src/utils/forms';
import { TextInputProps } from './types';
import { Icon } from '../Icon';

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
      icon,
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
      <div className="flex w-full">
        {icon && (
          <Icon
            className="self-end flex-shrink-0 w-12 h-12 p-2 text-app"
            icon={icon}
          />
        )}
        <div className="flex flex-col w-full">
          {label && (
            <label className="components-input-label" htmlFor={name}>
              {label}
              {required && (
                <span className="ml-1 font-bold text-app-error">*</span>
              )}
            </label>
          )}
          <div className="flex">
            <InputComponent
              className={cn(
                'bg-app-light text-app-text border-app-medium h-12 px-4 w-full rounded border-2 shadow-inner text-ellipsis focus-ring',
                className
              )}
              name={name}
              placeholder={placeholder || (mask && placeholderMap[mask])}
              mask={mask ? maskMap[mask] : ''}
              ref={ref}
              value={value ?? ''}
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

export default TextInput;

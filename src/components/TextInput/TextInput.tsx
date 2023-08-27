import { useMemo, forwardRef } from 'react';
import MaskInput from 'react-input-mask';
import cn from 'classnames';

import { maskMap, placeholderMap } from 'src/utils/forms';
import { TextInputProps } from './types';
import { Icon } from '../Icon';
import { InputLabel } from '../InputLabel';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
    forwardedRef
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
            className="h-12 w-12 flex-shrink-0 self-end p-2 text-app"
            icon={icon}
          />
        )}
        <div className="flex w-full flex-col">
          {label && (
            <InputLabel htmlFor={name} required={required}>
              {label}
            </InputLabel>
          )}
          <div className="flex">
            <InputComponent
              className={cn(
                'focus-ring h-12 w-full text-ellipsis rounded border-2 border-app-medium bg-app-light px-4 text-app-text shadow-inner',
                className
              )}
              name={name}
              placeholder={placeholder || (mask && placeholderMap[mask])}
              mask={mask ? maskMap[mask] : ''}
              ref={forwardedRef}
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

import { useMemo, forwardRef } from 'react';
import MaskInput from 'react-input-mask';
import cn from 'classnames';

import { maskMap, placeholderMap } from 'src/utils/forms';
import { TextInputProps } from './types';
import { Icon } from '../Icon';
import { InputLabel } from '../InputLabel';

//#region - Component

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
      icon,
      ...rest
    },
    forwardedRef
  ) => {
    //#region - Memos

    const InputComponent = useMemo(() => {
      return mask ? MaskInput : 'input';
    }, [mask]);

    const placeholderText = useMemo(() => {
      return mask ? placeholderMap[mask] : placeholder;
    }, [mask, placeholder]);

    //#endregion
    //#region - Render

    return (
      <div className={cn('flex w-full flex-col', className)}>
        {/* Label */}
        {label && (
          <InputLabel htmlFor={name} required={required}>
            {label}
          </InputLabel>
        )}

        {/* Input Wrapper */}
        <div className="relative flex w-full flex-grow self-start">
          {/* Icon */}
          {icon && (
            <Icon
              className="absolute ml-0.5 h-10 w-10 flex-shrink-0 p-2 text-app opacity-75"
              icon={icon}
            />
          )}
          {/* Input */}
          <InputComponent
            className={cn(
              'focus-ring box-border h-10 w-full text-ellipsis rounded border-2 bg-app-light pr-2 text-app-text shadow-inner',
              { 'pl-10': icon, 'pl-2': !icon }
            )}
            name={name}
            required={required}
            placeholder={placeholderText}
            mask={mask ? maskMap[mask] : ''}
            ref={forwardedRef}
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

      //#endregion
    );
  }
);

//#endregion

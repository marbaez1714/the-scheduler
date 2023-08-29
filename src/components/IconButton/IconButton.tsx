import { forwardRef } from 'react';
import cn from 'classnames';

import { IconButtonProps } from './types';
import { Icon } from '../Icon';

//#region - Component

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'filled',
      size = 'medium',
      rounded,
      loading,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    //#region - Render

    return (
      <button
        className={cn(
          'focus-ring scale-100 rounded p-2 active:scale-95',
          { 'rounded-full': rounded },
          { 'animate-pulse ': loading },
          {
            'bg-transparent text-app': variant === 'text',
            'bg-app text-app-altText shadow hover:bg-app-dark':
              variant === 'filled',
            'border-2 border-app bg-app-light text-app shadow hover:bg-app-medium':
              variant === 'outline',
          },
          className
        )}
        ref={forwardedRef}
        {...rest}
      >
        <Icon
          className={cn({
            'h-4': size === 'small',
            'h-6': size === 'medium',
            'h-8': size === 'large',
          })}
          icon={icon}
        />
      </button>
    );

    //#endregion
  }
);

//#endregion

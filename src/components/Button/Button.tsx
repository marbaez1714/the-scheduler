import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { Icon } from '../Icon';
import cn from 'classnames';

//#region - Component

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      children,
      leftIcon,
      rightIcon,
      className,
      loading,
      rounded,
      ...rest
    },
    forwardRef
  ) => {
    //#region - Render

    return (
      <button
        ref={forwardRef}
        disabled={loading}
        className={cn(
          'focus-ring flex scale-100 flex-row items-center justify-center rounded font-bold uppercase leading-none tracking-wider enabled:active:scale-95',
          { 'rounded-full': rounded },
          { 'animate-pulse ': loading },
          {
            'h-8 text-sm': size === 'small',
            'pl-4': !leftIcon && size === 'small',
            'pr-4': !rightIcon && size === 'small',
          },
          {
            'h-10': size === 'medium',
            'pl-8': !leftIcon && size === 'medium',
            'pr-8': !rightIcon && size === 'medium',
          },
          {
            'h-12 text-lg': size === 'large',
            'pl-10': !leftIcon && size === 'large',
            'pr-10': !rightIcon && size === 'large',
          },
          {
            'bg-transparent text-app hover:underline': variant === 'text',
            'bg-transparent text-app-altText hover:underline':
              variant === 'text-light',
            'bg-app text-app-altText shadow hover:bg-app-dark':
              variant === 'filled',
            'bg-app-light text-app shadow hover:bg-app-medium':
              variant === 'filled-light',
            'border-2 border-app bg-app-light text-app shadow hover:bg-app-medium':
              variant === 'outline',
          },
          {
            'pl-0': leftIcon,
            'pr-0': rightIcon,
          },
          className
        )}
        {...rest}
      >
        {/* Left Icon */}
        {leftIcon && !loading && (
          <Icon
            className={cn('h-4', {
              'mx-2': size === 'small',
              'mx-4': size === 'medium',
              'mx-5': size === 'large',
            })}
            icon={leftIcon}
          />
        )}

        {/* Content & Loading Icon */}
        {loading ? (
          <Icon className="h-6 animate-spin" icon="loading" />
        ) : (
          children
        )}

        {/* Right Icon */}
        {rightIcon && !loading && (
          <Icon
            className={cn('h-4', {
              'mx-2': size === 'small',
              'mx-4': size === 'medium',
              'mx-5': size === 'large',
            })}
            icon={rightIcon}
          />
        )}
      </button>
    );

    //#endregion
  }
);

//#endregion

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
        className={cn(
          'focus-ring relative flex scale-100 flex-row items-center justify-between rounded font-bold uppercase tracking-wider active:scale-95',
          { 'rounded-full': rounded, rounded: !rounded },
          { 'animate-pulse ': loading },
          {
            'h-8 text-sm': size === 'small',
            'h-10': size === 'medium',
            'h-12 text-lg': size === 'large',
          },
          {
            'bg-transparent text-app-altText hover:underline':
              variant === 'text',
            'bg-transparent text-app hover:underline': variant === 'text-light',
            'bg-app text-app-altText shadow hover:bg-app-dark':
              variant === 'filled',
            'bg-app-light text-app shadow hover:bg-app-medium':
              variant === 'filled-light',
            'border-2 border-app bg-app-light text-app shadow hover:bg-app-medium':
              variant === 'outline',
          },
          className
        )}
        {...rest}
      >
        {/* Left Icon */}
        <div
          className={cn({
            'px-2': size === 'small',
            'px-4': size === 'medium',
            'px-5': size === 'large',
          })}
        >
          {leftIcon && <Icon className="h-4" icon={leftIcon} />}
        </div>

        {/* Content */}
        {children}

        {/* Right Icon */}
        <div
          className={cn({
            'px-2': size === 'small',
            'px-4': size === 'medium',
            'px-5': size === 'large',
          })}
        >
          {rightIcon && <Icon className="h-4" icon={rightIcon} />}
        </div>
      </button>
    );

    //#endregion
  }
);

//#endregion

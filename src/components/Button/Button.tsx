import { ArrowPathIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

import { ButtonProps } from './types';

const Button = ({
  children,
  title,
  leftRender,
  rightRender,
  className,
  variant = 'filled',
  size = 'medium',
  loading,
  rounded,
  ...rest
}: ButtonProps) => {
  /******************************/
  /* Render                     */
  /******************************/

  return (
    <button
      tabIndex={0}
      className={cn(
        'focus-ring relative flex scale-100 items-center justify-center rounded font-bold uppercase tracking-wider text-app transition-all active:scale-95',
        size === 'small' && {
          'h-8 text-sm': true,
          'pl-6': !leftRender,
          'pr-6': !rightRender,
        },
        size === 'medium' && {
          'h-10': true,
          'pl-8': !leftRender,
          'pr-8': !rightRender,
        },
        size === 'large' && {
          'h-12 text-lg': true,
          'pl-10': !leftRender,
          'pr-10': !rightRender,
        },
        { 'bg-transparent hover:underline': variant === 'text' },
        {
          'bg-app text-app-light shadow hover:bg-app-dark':
            variant === 'filled',
        },
        {
          'bg-app-light shadow hover:bg-app-medium': variant === 'filled-light',
        },
        {
          'border-2 border-app bg-app-light shadow hover:bg-app-medium':
            variant === 'outline',
        },
        { 'rounded-full': rounded },
        className
      )}
      {...rest}
    >
      {loading ? (
        <ArrowPathIcon
          className={cn('animate-spin', {
            'h-6 w-6': size === 'small' || size === 'medium',
            'h-8 w-8': size === 'large',
          })}
        />
      ) : (
        <>
          {/******************************/}
          {/* Left                       */}
          {/******************************/}
          {leftRender && (
            <div
              className={cn({
                'mx-2 h-2 w-2': size === 'small',
                'mx-2 h-4 w-4': size === 'medium',
                'mx-2 h-6 w-6': size === 'large',
              })}
            >
              {leftRender}
            </div>
          )}
          {/******************************/}
          {/* Children                   */}
          {/******************************/}
          {children || title}
          {/******************************/}
          {/* Right                      */}
          {/******************************/}
          {rightRender && (
            <div
              className={cn({
                'mx-2 h-2 w-2': size === 'small',
                'mx-2 h-4 w-4': size === 'medium',
                'mx-2 h-6 w-6': size === 'large',
              })}
            >
              {rightRender}
            </div>
          )}
        </>
      )}
    </button>
  );
};

export default Button;

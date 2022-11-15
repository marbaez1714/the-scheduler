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
        'rounded tracking-wider uppercase font-bold text-app transition-all flex items-center relative scale-100 active:scale-95 focus-ring',
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
          'bg-app text-app-light hover:bg-app-dark shadow':
            variant === 'filled',
        },
        {
          'bg-app-light hover:bg-app-medium shadow': variant === 'filled-light',
        },
        {
          'bg-app-light border-2 border-app hover:bg-app-medium shadow':
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
                'h-2 w-2 mx-2': size === 'small',
                'h-4 w-4 mx-2': size === 'medium',
                'h-6 w-6 mx-2': size === 'large',
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
                'h-2 w-2 mx-2': size === 'small',
                'h-4 w-4 mx-2': size === 'medium',
                'h-6 w-6 mx-2': size === 'large',
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

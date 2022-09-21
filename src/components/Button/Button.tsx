import { useState, useEffect, useMemo } from 'react';
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
  ...rest
}: ButtonProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <button
      tabIndex={0}
      className={cn(
        'tracking-wider uppercase font-medium flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none',
        {
          'text-xs': size === 'small',
          'text-base': size === 'medium',
          'text-2xl': size === 'large',
          'py-1 px-3': size === 'small' && variant !== 'outline',
          'py-0.5 px-3': size === 'small' && variant === 'outline',
          'py-2 px-4':
            (size === 'medium' || size === 'large') && variant !== 'outline',
          'py-1.5 px-4':
            (size === 'medium' || size === 'large') && variant === 'outline',
          'text-app underline disabled:no-underline hover:text-app-text':
            variant === 'text',
          'bg-app text-app-altText rounded shadow hover:bg-app-dark transition-colors focus:bg-app-dark':
            variant === 'filled',
          'bg-transparent text-app rounded border-2 border-app-medium box-border shadow hover:border-app transition-all':
            variant === 'outline',
        },
        className
      )}
      {...rest}
    >
      {/******************************/}
      {/* Left                       */}
      {/******************************/}
      {leftRender && (
        <div
          className={cn({
            'mr-1 h-4 w-4': size === 'small',
            'mr-2 h-4 w-4': size === 'medium',
            'mr-3 h-8 w-8': size === 'large',
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
            'ml-1 h-4 w-4': size === 'small',
            'ml-2 h-4 w-4': size === 'medium',
            'ml-3 h-8 w-8': size === 'large',
          })}
        >
          {rightRender}
        </div>
      )}
    </button>
  );
};

export default Button;

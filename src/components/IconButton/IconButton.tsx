import cn from 'classnames';

import { IconButtonProps } from './types';

const IconButton = ({
  children,
  className,
  variant = 'filled',
  size = 'medium',
  ...rest
}: IconButtonProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <button
      tabIndex={0}
      className={cn(
        'flex items-center justify-center self-center rounded-full font-medium uppercase tracking-wider disabled:pointer-events-none disabled:opacity-50',
        {
          'p-1': size === 'small' && variant !== 'outline',
          'p-0.5': size === 'small' && variant === 'outline',
          'p-2':
            (size === 'medium' || size === 'large') && variant !== 'outline',
          'p-1.5':
            (size === 'medium' || size === 'large') && variant === 'outline',
          'text-app underline hover:text-app-text disabled:no-underline':
            variant === 'text',
          'rounded bg-app text-app-altText shadow transition-colors hover:bg-app-dark focus:bg-app-dark':
            variant === 'filled',
          'box-border rounded border-2 border-app-medium bg-transparent text-app shadow transition-all hover:border-app':
            variant === 'outline',
        },
        className
      )}
      {...rest}
    >
      <div
        className={cn({
          'h-4 w-4': size === 'small',
          'h-6 w-6': size === 'medium',
          'h-8 w-8': size === 'large',
        })}
      >
        {children}
      </div>
    </button>
  );
};

export default IconButton;

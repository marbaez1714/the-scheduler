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
        'tracking-wider uppercase font-medium flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none rounded-full self-center',
        {
          'p-1': size === 'small' && variant !== 'outline',
          'p-0.5': size === 'small' && variant === 'outline',
          'p-2': (size === 'medium' || size === 'large') && variant !== 'outline',
          'p-1.5': (size === 'medium' || size === 'large') && variant === 'outline',
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

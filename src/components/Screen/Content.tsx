import { PlusCircleIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { Button } from '../Button';
import { ContentProps } from './types';

export const Content = ({
  className,
  children,
  loading,
  centerHorizontal,
  centerVertical,
  center,
  primaryAction,
  column,
  title,
}: ContentProps) => {
  /******************************/
  /* Render Loading             */
  /******************************/

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-700/50">
        <h1 className="font-medium text-white animate-pulse">Loading</h1>
      </div>
    );
  }

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden bg-app-medium">
      {/* Title */}
      {(!!title || !!primaryAction) && (
        <div className="flex px-6 pt-4 pb-6 mx-4 rounded-b shadow text-app-altText bg-app">
          {!!title && <h1 className="text-4xl font-bold">{title}</h1>}
          {!!primaryAction && (
            <div className="ml-auto rounded bg-app-light">
              <Button
                onClick={primaryAction.onClick}
                variant="outline"
              >
                {primaryAction.title}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Comment */}
      <div
        className={cn(
          'flex flex-grow transition-all justify-start items-start p-4 overflow-scroll',
          {
            'flex-col': column,
            'justify-center': center || centerHorizontal,
            'items-center': center || centerVertical,
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

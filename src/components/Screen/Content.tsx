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
}: ContentProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-700/50">
        <h1 className="font-medium text-white animate-pulse">Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-app-medium">
      {/******************************/}
      {/* Content                    */}
      {/******************************/}
      <div
        className={cn(
          'flex flex-grow py-4 mx-4 overflow-auto transition-all justify-start items-start',
          {
            'justify-center': center || centerHorizontal,
            'items-center': center || centerVertical,
          },
          className
        )}
      >
        {children}
      </div>

      {/******************************/}
      {/* Actions                    */}
      {/******************************/}
      {!!primaryAction && (
        <div className="p-4 text-right border-t shadow bg-app-medium border-app-light">
          {!!primaryAction && (
            <Button className="w-full" onClick={primaryAction.onClick}>
              {primaryAction.title}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

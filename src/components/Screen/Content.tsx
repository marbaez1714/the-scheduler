import { Button } from '@mui/material';
import cn from 'classnames';
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
          'flex flex-grow m-4 overflow-auto transition-all justify-start items-start',
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
        <div className="p-2 text-right shadow bg-app">
          {!!primaryAction && (
            <Button variant="contained" onClick={primaryAction.onClick}>
              {primaryAction.title}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

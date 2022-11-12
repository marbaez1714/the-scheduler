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
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-x-hidden">
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-slate-700/50">
          <h1 className="font-medium text-white animate-pulse">Loading</h1>
        </div>
      )}
      {/* Title */}
      <div className="w-full max-w-5xl">
        {(!!title || !!primaryAction) && (
          <div className="flex px-6 py-6 mb-4 rounded shadow text-app-altText bg-app">
            {!!title && <h1 className="text-4xl font-bold tracking-wider">{title}</h1>}
            {!!primaryAction && (
              <div className="ml-auto rounded bg-app-light">
                <Button onClick={primaryAction.onClick} variant="outline">
                  {primaryAction.title}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'flex flex-grow transition-all justify-start items-start',
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
    </div>
  );
};

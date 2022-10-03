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
      {/* Comment */}
      <div
        className={cn(
          'flex flex-grow transition-all justify-start items-start p-4',
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

      {/* Actions  */}
      {!!primaryAction && (
        <div className="p-4 text-right border-t shadow bg-app-medium border-app-darkest">
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

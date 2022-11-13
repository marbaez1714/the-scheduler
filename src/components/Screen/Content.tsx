import cn from 'classnames';
import { Button } from '../Button';
import { ContentProps } from './types';

export const Content = ({
  className,
  children,
  loading,
  title,
  primaryAction,
}: ContentProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-slate-700/50">
          <h1 className="font-medium text-white uppercase animate-pulse">
            Loading
          </h1>
        </div>
      )}
      <div className={cn('max-w-5xl mx-auto w-full', className)}>
        {/* Title */}
        {(!!title || !!primaryAction) && (
          <div className="flex w-full px-6 py-6 mb-4 rounded shadow text-app-altText bg-app">
            {!!title && (
              <h1 className="text-4xl font-bold tracking-wider uppercase">
                {title}
              </h1>
            )}
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
        {children}
      </div>
    </>
  );
};

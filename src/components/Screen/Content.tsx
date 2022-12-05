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
      <div className="w-full mx-auto max-w-7xl">
        {/* Title */}
        {(!!title || !!primaryAction) && (
          <div className="flex flex-col w-full gap-4 px-6 py-6 mb-4 rounded shadow text-app-altText bg-app md:flex-row">
            {!!title && (
              <h1 className="text-4xl font-bold tracking-wider uppercase">
                {title}
              </h1>
            )}
            {!!primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                variant="filled-light"
                className="ml-0 md:ml-auto"
              >
                {primaryAction.title}
              </Button>
            )}
          </div>
        )}
        {/* Content */}
        <div className={className}>{children}</div>
      </div>
    </>
  );
};

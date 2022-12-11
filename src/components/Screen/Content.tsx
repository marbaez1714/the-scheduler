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
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-slate-700/50">
          <h1 className="animate-pulse font-medium uppercase text-white">
            Loading
          </h1>
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl">
        {/* Title */}
        {(!!title || !!primaryAction) && (
          <div className="gradient-b-app mb-4 flex w-full flex-col gap-4 rounded px-6 py-6 text-app-altText shadow md:flex-row">
            {!!title && (
              <h1 className="text-4xl font-bold uppercase tracking-wider">
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

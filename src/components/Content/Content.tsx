import cn from 'classnames';
import { ContentProps } from './types';

const Content = ({
  className,
  children,
  loading,
  centerHorizontal,
  centerVertical,
  center,
}: ContentProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-700/50">
        <h1 className="font-medium animate-pulse text-white">Loading</h1>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full h-full p-8 overflow-auto transition-all bg-slate-300 justify-start items-start',
        {
          'justify-center': center || centerHorizontal,
          'items-center': center || centerVertical,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Content;

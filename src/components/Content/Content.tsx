import { Refresh } from '@mui/icons-material';
import classNames from 'classnames';
import { ContentProps } from './types';

const Content = ({ className, children, loading }: ContentProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <>
      <div className={classNames(className, 'w-full', 'p-8')}>{children}</div>
      {loading && (
        <div className="absolute h-full w-full bg-slate-800/70 left-0 top-0 flex justify-center items-center">
          <div className="animate-pulse">
            <Refresh className="animate-spin text-white" fontSize="large" />
          </div>
        </div>
      )}
    </>
  );
};

export default Content;

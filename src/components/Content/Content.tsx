import { Loop } from '@mui/icons-material';
import { ContentProps } from './types';

const Content = ({ className, children, loading }: ContentProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return loading ? (
    <div className="flex flex-grow h-full items-center justify-center">
      <Loop className="animate-spin" fontSize="large" />
    </div>
  ) : (
    <div className={className || `w-full`}>{children}</div>
  );
};

export default Content;

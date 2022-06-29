import { Backdrop, CircularProgress } from '@mui/material';
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
      <Backdrop open={!!loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default Content;

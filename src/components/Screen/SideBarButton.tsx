import { Icon } from '@mui/material';
import classNames from 'classnames';
import { SideBarButtonProps } from './types';

export const SideBarButton = ({
  title,
  leftIcon,
  rightIcon,
  className,
  onClick,
}: SideBarButtonProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <button
      className={classNames(
        'flex items-center px-6 py-3 hover:bg-slate-800 transition-all',
        className
      )}
      onClick={onClick}
    >
      {leftIcon && <Icon className="text-white">{leftIcon}</Icon>}
      <span className="ml-3 mr-8">{title}</span>
      {rightIcon && <Icon className="text-white">{rightIcon}</Icon>}
    </button>
  );
};
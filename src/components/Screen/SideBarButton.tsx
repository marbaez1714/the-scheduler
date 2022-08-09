import { Icon } from '@mui/material';
import classNames from 'classnames';
import { SideBarButtonProps } from './types';

export const SideBarButton = ({ title, leftIcon, rightIcon, className, expanded, onClick }: SideBarButtonProps) => {
  return (
    <button
      className={classNames('flex items-center w-full px-6 py-3 hover:bg-slate-800 transition-all', className)}
      onClick={onClick}
    >
      <Icon className="text-white">{leftIcon}</Icon>
      {expanded && <span className="ml-3 mr-8">{title}</span>}
      {expanded && rightIcon && <Icon className="text-white">{rightIcon}</Icon>}
    </button>
  );
};

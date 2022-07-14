import { Icon } from '@mui/material';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { SideBarLinkProps } from './types';

export const SideBarLink = ({ title, to, icon, className, expanded }: SideBarLinkProps) => {
  return (
    <div className={classNames('px-6 py-3 hover:bg-slate-800 transition-all', className)}>
      <NavLink to={to} className={({ isActive }) => (isActive ? 'underline' : undefined)}>
        <div className="flex items-center">
          {icon && <Icon className="text-white">{icon}</Icon>}
          {expanded && <span className="ml-3 mr-8">{title}</span>}
        </div>
      </NavLink>
    </div>
  );
};

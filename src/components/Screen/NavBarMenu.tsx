import cn from 'classnames';

import { Menu, Transition } from '@headlessui/react';
import { NavBarMenuProps } from './types';
import { Link } from 'react-router-dom';

export const NavBarMenu = ({ icon, to, links, title }: NavBarMenuProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={({ open }) =>
          cn(
            'w-12 h-12 p-3 text-app-light transition-colors',
            { 'bg-app-darkest': !open },
            { 'border border-app-medium': open }
          )
        }
      >
        {icon}
      </Menu.Button>

      <Transition
        className="transition-all"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute z-50 flex flex-col w-64 overflow-hidden text-xs rounded-b shadow-2xl bg-app-darkest text-app-altText">
          {/* Title */}
          <Link
            className="flex items-center px-4 py-2 font-bold tracking-wider transition-all hover:bg-app"
            to={to}
          >
            {title}
          </Link>

          {links && (
            <div className="border-t border-t-app-medium">
              {links.map((item) => (
                <Menu.Item key={item.name}>
                  <Link
                    className="flex items-center px-4 py-2 transition-all hover:bg-app"
                    to={item.to}
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

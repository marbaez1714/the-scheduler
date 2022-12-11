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
          cn('h-12 w-12 p-3 text-app-light transition-colors', {
            'border border-app-medium bg-app-dark': open,
          })
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
        <Menu.Items className="absolute z-50 flex w-64 flex-col overflow-hidden rounded-b shadow-2xl">
          {/* Title */}
          <Link
            className="flex items-center bg-app px-4 py-2 font-bold tracking-wider text-app-altText transition-all hover:bg-app-dark"
            to={to}
          >
            {title}
          </Link>

          {links && (
            <div className="border-t border-t-app-medium">
              {links.map((item) => (
                <Menu.Item key={item.name}>
                  <Link
                    className="flex items-center bg-app-light px-4 py-2 text-app-text transition-all hover:bg-app-medium"
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

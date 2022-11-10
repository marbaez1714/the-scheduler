import { useState, useEffect, useMemo } from 'react';
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
            { 'bg-app-dark': open }
          )
        }
      >
        {icon}
      </Menu.Button>

      <Transition
        as={Menu.Items}
        className="absolute z-50 flex flex-col w-64 mt-1 overflow-hidden transition-all divide-y rounded shadow-2xl bg-app-light text-app-text divide-app-medium"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* Title */}
        <Link
          className="flex items-center px-4 py-2 font-bold tracking-wider transition-all hover:bg-app-medium"
          to={to}
        >
          {title}
        </Link>

        {links?.map((item) => (
          <Menu.Item key={item.name}>
            <Link
              className="flex items-center py-2 pl-8 pr-4 transition-all hover:bg-app-medium"
              to={item.to}
            >
              {item.name}
            </Link>
          </Menu.Item>
        ))}
      </Transition>
    </Menu>
  );
};

import { useState, useRef } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import cn from 'classnames';

import { MenuProps } from './types';

const Menu = ({ items, anchor, title, className }: MenuProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /******************************/
  /* State                      */
  /******************************/
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();
  const [marginTop, setMarginTop] = useState<number>();

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
  /* Callbacks                  */
  /******************************/
  const handleClick = () => {
    const { top, right } = containerRef.current?.getBoundingClientRect() ?? {
      top: 0,
    };

    setTop(top);
    setLeft(right);
  };

  const handleAfterEnter = () => {
    const { bottom } = listRef.current?.getBoundingClientRect() ?? {
      bottom: 0,
    };

    const windowBottom = window.innerHeight - 16;
    setMarginTop(bottom > windowBottom ? windowBottom - bottom : 0);
  };

  const handleLeave = () => {
    setTop(undefined);
    setLeft(undefined);
    setMarginTop(undefined);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <HeadlessMenu as="div" className={className} ref={containerRef}>
      {({ open }) => (
        <>
          <HeadlessMenu.Button
            onClick={handleClick}
            className={cn({ 'ring-2 ring-app': open })}
          >
            {anchor}
          </HeadlessMenu.Button>
          <Transition
            show={open}
            unmount
            className="transition-all"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterEnter={handleAfterEnter}
            afterLeave={handleLeave}
          >
            <HeadlessMenu.Items
              className="fixed z-50 flex flex-col w-40 ml-2 overflow-hidden text-xs transition-all rounded shadow-2xl bg-app-light divide-app-medium"
              style={{ top, left, marginTop }}
              ref={listRef}
              static
            >
              <div className="flex items-center px-4 py-2 font-bold tracking-wider transition-all text-app-altText bg-app">
                <span>{title}</span>
              </div>
              {items.map((action) => (
                <HeadlessMenu.Item key={action.label}>
                  <button
                    className="flex items-center w-full px-4 py-2 transition-all text-app-darkest hover:bg-app-medium"
                    onClick={action.onClick}
                  >
                    {action.icon && (
                      <div className="w-3 h-3 mr-2">{action.icon}</div>
                    )}
                    {action.label}
                  </button>
                </HeadlessMenu.Item>
              ))}
            </HeadlessMenu.Items>
          </Transition>
        </>
      )}
    </HeadlessMenu>
  );
};

export default Menu;

import { useState, useRef } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import cn from 'classnames';

import { MenuProps } from './types';

const Menu = ({ items, anchor, title, className }: MenuProps) => {
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
    <HeadlessMenu
      as="div"
      className={cn('w-min', className)}
      ref={containerRef}
    >
      {({ open }) => (
        <>
          <HeadlessMenu.Button
            onClick={handleClick}
            className={cn('rounded-full', { 'ring-2 ring-app': open })}
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
              className="fixed z-50 ml-2 flex flex-col overflow-hidden rounded bg-app-light shadow-2xl transition-all"
              style={{ top, left, marginTop }}
              ref={listRef}
              static
            >
              <div className="flex items-center bg-app px-4 py-2 font-bold tracking-wider text-app-altText transition-all">
                <span>{title}</span>
              </div>
              {items.map((action) => (
                <HeadlessMenu.Item key={action.label}>
                  <button
                    className="flex w-full items-center px-4 py-2 text-app-darkest transition-all hover:bg-app-medium"
                    onClick={action.onClick}
                  >
                    {action.icon && (
                      <div className="mr-2 h-3 w-3">{action.icon}</div>
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

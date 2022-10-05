import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

import { CollapsableProps } from './types';

const Collapsable = ({
  title,
  subtitle,
  rightRender,
  defaultOpen,
  footerRender,
  children,
}: CollapsableProps) => {
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
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="flex flex-col w-full overflow-hidden rounded shadow-lg">
          {/******************************/}
          {/* Header                     */}
          {/******************************/}
          <div className="flex items-center py-6 pl-4 pr-6 bg-app">
            <Disclosure.Button className="p-2 mr-4 shadow-none text-app-altText">
              {open ? (
                <ChevronDownIcon className="w-6" />
              ) : (
                <ChevronRightIcon className="w-6" />
              )}
            </Disclosure.Button>

            {/******************************/}
            {/* Title                      */}
            {/******************************/}
            <div className="flex items-end basis-2/3">
              <h1 className="text-4xl font-semibold tracking-wide text-app-altText">
                {title}
              </h1>
              {subtitle && (
                <p className="ml-4 opacity-50 text-app-altText">{subtitle}</p>
              )}
            </div>
            {/******************************/}
            {/* Right Render               */}
            {/******************************/}
            {rightRender && (
              <Transition
                as={Fragment}
                show={open}
                enter="transition origin-right duration-100 ease-out"
                enterFrom="transform scale-x-95 opacity-0"
                enterTo="transform scale-x-100 opacity-100"
                leave="transition origin-left duration-100 ease-out"
                leaveFrom="transform scale-x-100 opacity-100"
                leaveTo="transform scale-x-95 opacity-0"
              >
                {rightRender}
              </Transition>
            )}
          </div>
          {/******************************/}
          {/* Content                    */}
          {/******************************/}
          <Transition
            enter="transition origin-top duration-100 ease-out"
            enterFrom="transform scale-y-95 opacity-0"
            enterTo="transform scale-y-100 opacity-100"
            leave="transition origin-top duration-100 ease-out"
            leaveFrom="transform scale-y-100 opacity-100"
            leaveTo="transform scale-y-95 opacity-0"
          >
            <Disclosure.Panel>
              <div className="overflow-x-scroll overflow-y-scroll border-t shadow-inner whitespace-nowrap bg-app-light border-t-app-medium">
                {children}
              </div>
              {footerRender}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default Collapsable;

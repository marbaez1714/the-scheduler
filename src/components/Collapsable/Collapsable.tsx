import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

import { CollapsableProps } from './types';

const Collapsable = ({
  title,
  subtitle,
  defaultOpen,
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
        <div className="flex flex-col flex-shrink-0 w-full transition-all rounded">
          {/******************************/}
          {/* Header                     */}
          {/******************************/}
          <div className="z-10 flex items-center p-4 rounded shadow bg-app">
            <Disclosure.Button
              title="Expand"
              className={cn(
                'p-2 mr-2 shadow-none text-app-altText transition-all',
                {
                  'rotate-90': open,
                  'rotate-0': !open,
                }
              )}
            >
              <ChevronRightIcon className="w-4" />
            </Disclosure.Button>

            {/******************************/}
            {/* Title                      */}
            {/******************************/}
            <div className="flex items-end basis-2/3">
              <h1 className="text-2xl font-semibold tracking-wide text-app-altText">
                {title}
              </h1>
              {subtitle && (
                <p className="ml-2 text-sm text-app-altText/50">{subtitle}</p>
              )}
            </div>
          </div>
          {/******************************/}
          {/* Content                    */}
          {/******************************/}
          <Transition
            show={open}
            className="z-0 mx-2 mt-2 transition-all"
            enterFrom="max-h-0"
            enterTo="max-h-screen"
            leaveFrom="max-h-screen"
            leaveTo="max-h-0"
          >
            <Disclosure.Panel
              static
              className="flex overflow-hidden rounded shadow"
            >
              {children}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default Collapsable;

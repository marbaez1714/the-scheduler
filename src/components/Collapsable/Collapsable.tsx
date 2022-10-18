import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

import { CollapsableProps } from './types';

const Collapsable = ({
  title,
  subtitle,
  defaultOpen,
  children,
  unmount = true,
}: CollapsableProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Disclosure defaultOpen={defaultOpen}>
      <div className="flex flex-col flex-shrink-0 w-full transition-all rounded">
        {/******************************/}
        {/* Header                     */}
        {/******************************/}
        <div className="z-10 flex items-center p-4 rounded shadow bg-app">
          <Disclosure.Button
            title="Expand"
            className={({ open }) =>
              cn('p-2 mr-2 shadow-none text-app-altText transition-all', {
                'rotate-90': open,
                'rotate-0': !open,
              })
            }
          >
            <ChevronRightIcon className="w-4" />
          </Disclosure.Button>

          {/******************************/}
          {/* Title                      */}
          {/******************************/}
          <div className="flex items-end basis-2/3 text-app-altText">
            <h1 className="text-2xl font-semibold tracking-wide">{title}</h1>
            {subtitle && <p className="ml-2 text-sm opacity-50">{subtitle}</p>}
          </div>
        </div>
        {/******************************/}
        {/* Content                    */}
        {/******************************/}
        <Disclosure.Panel
          className="m-2 overflow-hidden rounded bg-app-light max-h-[700px]"
          unmount={unmount}
        >
          {children}
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default Collapsable;

import { Disclosure } from '@headlessui/react';
import { ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

import { CollapsableProps } from './types';

const Collapsable = ({
  title,
  subtitle,
  defaultOpen,
  children,
  loading,
  unmount = true,
  disablePadding,
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
        <div className="flex items-center h-12 px-2 uppercase rounded shadow-lg bg-app text-app-altText">
          {loading ? (
            <div className="p-2 mr-2">
              <ArrowPathIcon className="w-4 animate-spin" />
            </div>
          ) : (
            <Disclosure.Button
              title="Expand"
              className={({ open }) =>
                cn('p-2 mr-2 shadow-none transition-all', {
                  'rotate-90': open,
                  'rotate-0': !open,
                })
              }
            >
              <ChevronRightIcon className="w-4" />
            </Disclosure.Button>
          )}

          {/******************************/}
          {/* Title                      */}
          {/******************************/}
          <div
            className={cn('flex text-app-altText whitespace-nowrap overflow-hidden', {
              'animate-pulse': loading,
            })}
          >
            <h4 className="overflow-hidden text-xl font-semibold tracking-wider text-ellipsis">{title}</h4>
            {subtitle && <p className="ml-2 text-sm opacity-50">{subtitle}</p>}
          </div>
        </div>
        {/******************************/}
        {/* Content                    */}
        {/******************************/}
        <Disclosure.Panel
          className={cn('rounded-b bg-app-light shadow-lg mx-2', {
            'pointer-events-none animate-pulse': loading,
            'p-4': !disablePadding,
          })}
          unmount={unmount}
        >
          {children}
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default Collapsable;

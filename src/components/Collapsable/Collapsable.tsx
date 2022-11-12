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
        <div className="flex items-center p-4 rounded shadow bg-app text-app-altText">
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
            className={cn('flex items-end basis-2/3 text-app-altText', {
              'animate-pulse': loading,
            })}
          >
            <h1 className="text-2xl font-semibold tracking-wider">{title}</h1>
            {subtitle && <p className="ml-2 text-sm opacity-50">{subtitle}</p>}
          </div>
        </div>
        {/******************************/}
        {/* Content                    */}
        {/******************************/}
        <Disclosure.Panel
          className={cn('m-2 rounded bg-app-light shadow', {
            'pointer-events-none animate-pulse': loading,
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

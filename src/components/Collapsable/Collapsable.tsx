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
      <div className="flex w-full flex-shrink-0 flex-col rounded transition-all">
        {/******************************/}
        {/* Header                     */}
        {/******************************/}
        <div className="gradient-br-app flex h-12 items-center rounded px-2 uppercase text-app-altText shadow-lg">
          {loading ? (
            <div className="mr-2 p-2">
              <ArrowPathIcon className="w-4 animate-spin" />
            </div>
          ) : (
            <Disclosure.Button
              title="Expand"
              className={({ open }) =>
                cn('mr-2 p-2 shadow-none transition-all', {
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
            className={cn(
              'flex overflow-hidden whitespace-nowrap text-app-altText',
              {
                'animate-pulse': loading,
              }
            )}
          >
            <h4 className="overflow-hidden text-ellipsis text-xl font-semibold tracking-wider">
              {title}
            </h4>
            {subtitle && <p className="ml-2 text-sm opacity-50">{subtitle}</p>}
          </div>
        </div>
        {/******************************/}
        {/* Content                    */}
        {/******************************/}
        <Disclosure.Panel
          className={cn('mx-2 rounded-b gradient-r-app-lightest shadow-lg ', {
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

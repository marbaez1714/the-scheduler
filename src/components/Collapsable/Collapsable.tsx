import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import { CollapsableProps } from './types';
import { Button } from '../Button';

const Collapsable = ({
  action,
  title,
  subtitle,
  loading,
  children,
  defaultOpen,
  open,
  onToggle,
}: CollapsableProps) => {
  /******************************/
  /* State                      */
  /******************************/
  const [panelOpen, setPanelOpen] = useState(!!defaultOpen);

  /******************************/
  /* Effects                    */
  /******************************/
  useEffect(() => {
    if (open) {
      setPanelOpen(open);
    }
  }, [open]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const toggleOpen = () => {
    setPanelOpen((prev) => {
      onToggle?.(!prev);
      return !prev;
    });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div>
      {/* Header */}
      <div className="gradient-br-app flex h-12 items-center rounded px-2 uppercase text-app-altText shadow-lg">
        {loading ? (
          <div className="mr-2 p-2">
            <ArrowPathIcon className="w-4 animate-spin" />
          </div>
        ) : (
          <button
            title="Expand"
            className={cn('mr-2 p-2 shadow-none transition-all', {
              'rotate-90': panelOpen,
              'rotate-0': !panelOpen,
            })}
            onClick={toggleOpen}
          >
            <ChevronRightIcon className="w-4" />
          </button>
        )}

        {/******************************/}
        {/* Title                      */}
        {/******************************/}
        <div
          className={cn(
            'flex items-end overflow-hidden whitespace-nowrap text-app-altText',
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

        {action && (
          <Button onClick={action.onClick} className="ml-auto" variant="text">
            {action.label}
          </Button>
        )}
      </div>
      <div
        className={cn(
          'gradient-r-app-lightest mx-2 rounded-b p-4 shadow-lg transition-all',
          {
            'pointer-events-none animate-pulse': loading,
            hidden: !panelOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsable;

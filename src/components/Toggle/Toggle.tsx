import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Switch } from '@headlessui/react';

import { ToggleProps } from './types';

const Toggle = ({ checked, disabled, title, onChange }: ToggleProps) => {
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
    <div
      className={cn('flex items-center h-6 gap-x-2', {
        'opacity-25 pointer-events-none': disabled,
      })}
    >
      <Switch
        checked={checked}
        onChange={onChange}
        className={({ checked }) =>
          cn(
            'relative inline-flex h-5 w-10  cursor-pointer transition-all ease-in-out shadow-inner rounded',
            { 'bg-app-success': checked, 'bg-app-medium': !checked }
          )
        }
        disabled={disabled}
      >
        {({ checked }) => (
          <span
            aria-hidden="true"
            className={cn(
              `absolute pointer-events-none inline-block h-4 w-5 transform bg-app-light ring-0 transition top-0.5 left-0.5 shadow rounded-sm`,
              {
                'translate-x-4': checked,
                'translate-x-0': !checked,
              }
            )}
          />
        )}
      </Switch>
      <span
        className={cn('transition', {
          'opacity-100': checked,
          'opacity-25': !checked,
        })}
      >
        {title}
      </span>
    </div>
  );
};

export default Toggle;

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
      className={cn('flex h-6 items-center gap-x-2', {
        'pointer-events-none opacity-25': disabled,
      })}
    >
      <Switch
        className="flex items-center"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      >
        {({ checked }) => (
          <>
            <div
              className={cn(
                'relative mr-3 inline-flex h-6 w-12 cursor-pointer rounded shadow-inner transition-all ease-in-out',
                { 'bg-app-success': checked, 'bg-app-medium': !checked }
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  `pointer-events-none absolute top-0.5 left-0.5 inline-block h-5 w-5 transform rounded-sm bg-app-light shadow ring-0 transition`,
                  {
                    'translate-x-6': checked,
                    'translate-x-0': !checked,
                  }
                )}
              />
            </div>
            <span
              className={cn('whitespace-nowrap transition', {
                'opacity-100': checked,
                'opacity-25': !checked,
              })}
            >
              {title}
            </span>
          </>
        )}
      </Switch>
    </div>
  );
};

export default Toggle;

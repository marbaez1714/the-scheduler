import cn from 'classnames';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { RadioGroupInputProps } from './types';

const RadioGroupInput = <TValue extends unknown>({
  label,
  required,
  className,
  options,
  onChange,
  value,
}: RadioGroupInputProps<TValue>) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      {label && (
        <RadioGroup.Label className="components-input-label">
          {label}
          {required && <span className="ml-1 font-bold text-app-error">*</span>}
        </RadioGroup.Label>
      )}
      <div className="flex gap-2">
        {options.map((option) => (
          <RadioGroup.Option
            value={option.value}
            className={({ checked }) =>
              cn(
                'flex h-10 flex-shrink-0 flex-grow cursor-pointer items-center rounded border-2 border-app bg-app-light  pl-4 pr-2 font-bold uppercase tracking-wider text-app transition-colors',
                {
                  shadow: !checked,
                  'border-app-success bg-app-success text-app-altText shadow-inner':
                    checked,
                }
              )
            }
            key={`${option.value}`}
          >
            {({ checked }) => (
              <>
                <span>{option.label}</span>
                <CheckCircleIcon
                  className={cn(
                    'ml-auto h-6 text-app-altText opacity-0 transition-all',
                    {
                      'opacity-100': checked,
                    }
                  )}
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioGroupInput;

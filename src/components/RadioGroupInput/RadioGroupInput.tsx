import cn from 'classnames';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { RadioGroupInputProps } from './types';

const RadioGroupInput = ({
  label,
  required,
  className,
  options,
  onChange,
  value,
}: RadioGroupInputProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      {label && (
        <RadioGroup.Label className="block mb-2 font-medium text-app-dark">
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
                'flex flex-grow flex-shrink-0 pl-4 pr-2 py-2 transition-colors border-2 rounded  text-app bg-app-light border-app-medium cursor-pointer',
                {
                  shadow: !checked,
                  'bg-app-success border-app-success text-app-altText shadow-inner':
                    checked,
                }
              )
            }
            key={option.value}
          >
            {({ checked }) => (
              <>
                <span>{option.label}</span>
                <CheckCircleIcon
                  className={cn(
                    'h-6 ml-auto opacity-0 transition-all text-app-altText',
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

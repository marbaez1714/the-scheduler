import { RadioGroup } from '@headlessui/react';
import { InputOption, InputProps } from '../types';

export interface RadioGroupInputProps extends InputProps {
  className?: string;
  options: InputOption[];
  onChange: (value: string) => void;
  value: string;
}

import { InputProps } from '../types';

export interface RadioGroupInputProps<TValue> extends InputProps {
  value: TValue;
  options: { label: string; value: TValue }[];
  onChange: (value: TValue) => void;
  className?: string;
}

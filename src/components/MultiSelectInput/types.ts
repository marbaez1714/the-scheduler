import { InputOption, InputProps } from '../types';

export interface MultiSelectInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  options: InputOption[];
  value: string[];
  name?: string;
  onBlur?: () => void;
  onChange: (value: string[]) => void;
}

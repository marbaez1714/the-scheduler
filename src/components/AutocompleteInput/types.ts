import { InputOption, InputProps } from '../types';

export interface AutocompleteInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  options: InputOption[];
  value: string;
  name?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

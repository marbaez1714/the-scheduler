import { InputOption, InputProps } from '../types';

export interface AutocompleteInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  options: InputOption[];
  value: string;
  name?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

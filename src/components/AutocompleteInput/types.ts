import { IconProps } from '../Icon';
import { InputOption } from '../types';

export interface AutocompleteInputProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  options: InputOption[];
  value: string | null;
  name?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange: (value: string | null) => void;
  icon?: IconProps['icon'];
}

import { IconProps } from '../Icon';
import { InputOption, InputProps } from '../types';

export interface AutocompleteInputProps extends InputProps {
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

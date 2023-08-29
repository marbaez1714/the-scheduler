import { IconProps } from '../Icon';

export interface AutocompleteInputProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string | null;
  name?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange: (value: string | null) => void;
  icon?: IconProps['icon'];
}

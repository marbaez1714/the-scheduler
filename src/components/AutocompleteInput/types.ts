import { InputProps } from '../types';

export type AutocompleteOption = { label: string; value: string };

export interface AutocompleteInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value: string;
  name?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

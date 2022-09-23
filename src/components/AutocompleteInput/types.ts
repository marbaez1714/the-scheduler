import { InputProps } from '../types';

export type AutocompleteOption = { label: string; value: string };

export interface AutocompleteInputProps<TValue = string | number>
  extends InputProps {
  className?: string;
  options: AutocompleteOption[];
  value: TValue;
  name?: string;
  onBlur: () => void;
  onChange: (value: TValue) => void;
}

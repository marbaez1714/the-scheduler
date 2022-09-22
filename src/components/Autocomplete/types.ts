export type AutocompleteOption = { label: string; value: string };

export interface AutocompleteProps<TValue = string | number> {
  label?: string;
  className?: string;
  required?: boolean;
  options: AutocompleteOption[];
  value: TValue;
  onChange: (value: TValue) => void;
  errorMessage?: string;
  name?: string;
  onBlur: () => void;
}

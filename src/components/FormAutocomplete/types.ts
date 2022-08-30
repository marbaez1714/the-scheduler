import { FieldValues, UseControllerProps } from 'react-hook-form';

export type FormAutocompleteOption = { label: string; value: string };

export interface FormAutocompleteProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  className?: string;
  required?: boolean;
  options: FormAutocompleteOption[];
}

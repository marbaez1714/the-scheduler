import { FieldValues, UseControllerProps } from 'react-hook-form';

export type FormAutocompleteOption = { label: string; value: string | number };

export interface FormAutocompleteProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  options: FormAutocompleteOption[];
}

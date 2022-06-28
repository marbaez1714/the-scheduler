import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface FormAutocompleteProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  className?: string;
}

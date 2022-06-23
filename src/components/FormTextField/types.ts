import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface FormTextFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  multiline?: boolean;
  className?: string;
}

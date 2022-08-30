import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface FormTextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  className?: string;
  required?: boolean;
}

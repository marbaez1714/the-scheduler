import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface FormTextInputsProp<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  mask?: 'phone';
}

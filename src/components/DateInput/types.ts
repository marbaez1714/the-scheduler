import { ReactDatePickerProps } from 'react-datepicker';

export interface DateInputProps extends ReactDatePickerProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
}

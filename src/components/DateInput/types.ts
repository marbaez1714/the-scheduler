import { ReactDatePickerProps } from 'react-datepicker';

export interface DateInputProps extends ReactDatePickerProps {
  label?: string;
  errorMessage?: string;
}

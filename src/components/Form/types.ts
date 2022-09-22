import { FieldValues, UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from 'src/components/Autocomplete';

export interface FormProps {
  title: string;
  children: React.ReactNode;
  isValid: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onClearClick?: () => void;
}

/******************************/
/* Inputs                     */
/******************************/
export interface FormTextInputProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  required?: boolean;
  mask?: 'phone';
}

export interface FormTextAreaProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  required?: boolean;
}

export interface FormAutoCompleteProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  required?: boolean;
  options: AutocompleteProps['options'];
}

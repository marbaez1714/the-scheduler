import { FieldValues, UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from 'src/components/AutocompleteInput';

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
interface FormInput<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  required?: boolean;
}

export interface FormTextInputProps<TFields extends FieldValues>
  extends FormInput<TFields> {
  mask?: 'phone';
}

export type FormTextAreaInputProps<TFields extends FieldValues> =
  FormInput<TFields>;

export interface FormAutoCompleteInputProps<TFields extends FieldValues>
  extends FormInput<TFields> {
  options: AutocompleteProps['options'];
}

export type FormDateInputProps<TFields extends FieldValues> =
  FormInput<TFields>;

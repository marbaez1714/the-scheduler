import { FieldValues, UseControllerProps } from 'react-hook-form';

import { AutocompleteInputProps } from 'src/components/AutocompleteInput';

export interface FormProps {
  title: string;
  children: React.ReactNode;
  isValid: boolean;
  className?: string;
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
  options: AutocompleteInputProps['options'];
}

export type FormDateInputProps<TFields extends FieldValues> =
  FormInput<TFields>;

export interface FormLineItemInputProps<TFields extends FieldValues>
  extends FormInput<TFields> {
  suppliers: AutocompleteInputProps['options'];
}

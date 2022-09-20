import { FieldValues, UseControllerProps } from 'react-hook-form';

/******************************/
/* Text Input                 */
/******************************/
export interface TextInputProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  mask?: 'phone';
}

/******************************/
/* Text Area                  */
/******************************/
export interface TextAreaProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  className?: string;
  required?: boolean;
}

/******************************/
/* AutoComplete               */
/******************************/
export type AutocompleteOption = { label: string; value: string };

export interface AutocompleteProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  className?: string;
  required?: boolean;
  options: AutocompleteOption[];
}

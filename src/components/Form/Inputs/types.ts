import { FieldValues, UseControllerProps } from 'react-hook-form';

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

/******************************/
/* DateInput                  */
/******************************/
export interface DateInputProps<TFields extends FieldValues>
  extends UseControllerProps<TFields> {
  label?: string;
  className?: string;
  required?: boolean;
}

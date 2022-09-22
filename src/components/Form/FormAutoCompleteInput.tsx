import { FieldValues, useController } from 'react-hook-form';

import { AutocompleteInput } from '../AutocompleteInput';

import { FormAutoCompleteInputProps } from './types';

export const FormAutoCompleteInput = <TFields extends FieldValues>({
  label,
  required,
  options,
  ...rest
}: FormAutoCompleteInputProps<TFields>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <AutocompleteInput
      label={label}
      required={required}
      options={options}
      errorMessage={error?.message}
      {...field}
    />
  );
};

import { FieldValues, useController } from 'react-hook-form';

import { AutocompleteInput } from '../AutocompleteInput';

import { FormAutoCompleteInputProps } from './types';

export const FormAutoCompleteInput = <TFields extends FieldValues>({
  label,
  required,
  options,
  icon,
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
      icon={icon}
      required={required}
      options={options}
      errorMessage={error?.message}
      {...field}
    />
  );
};

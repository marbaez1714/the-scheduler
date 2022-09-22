import { FieldValues, useController } from 'react-hook-form';

import { Autocomplete } from '../Autocomplete';

import { FormAutoCompleteProps } from './types';

export const FormAutoComplete = <TFields extends FieldValues>({
  label,
  required,
  options,
  ...rest
}: FormAutoCompleteProps<TFields>) => {
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
    <Autocomplete
      label={label}
      required={required}
      options={options}
      errorMessage={error?.message}
      {...field}
    />
  );
};

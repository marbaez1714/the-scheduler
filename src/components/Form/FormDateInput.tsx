import { FieldValues, useController } from 'react-hook-form';

import { DateInput } from '../DateInput';
import { FormDateInputProps } from './types';

export const FormDateInput = <TFields extends FieldValues>({
  label,
  required,
  ...rest
}: FormDateInputProps<TFields>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field: { value, ...restField },
    fieldState: { error },
  } = useController(rest);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <DateInput
      label={label}
      required={required}
      errorMessage={error?.message}
      selected={value}
      value={value}
      placeholderText="MM/DD/YYYY"
      {...restField}
    />
  );
};

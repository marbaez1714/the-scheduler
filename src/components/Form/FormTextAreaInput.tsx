import { FieldValues, useController } from 'react-hook-form';

import { TextAreaInput } from '../TextAreaInput';
import { FormTextAreaInputProps } from './types';

export const FormTextAreaInput = <TFields extends FieldValues>({
  label,
  required,
  ...rest
}: FormTextAreaInputProps<TFields>) => {
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
    <TextAreaInput
      label={label}
      required={required}
      errorMessage={error?.message}
      {...field}
    />
  );
};

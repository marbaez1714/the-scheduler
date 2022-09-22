import { FieldValues, useController } from 'react-hook-form';

import { TextInput } from 'src/components/TextInput';
import { FormTextInputProps } from './types';

export const FormTextInput = <TFields extends FieldValues>({
  label,
  required,
  mask,
  ...rest
}: FormTextInputProps<TFields>) => {
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
    <TextInput
      label={label}
      required={required}
      mask={mask}
      errorMessage={error?.message}
      {...field}
    />
  );
};

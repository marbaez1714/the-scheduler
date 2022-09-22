import { FieldValues, useController } from 'react-hook-form';

import { TextArea } from '../TextArea';
import { FormTextAreaProps } from './types';

export const FormTextArea = <TFields extends FieldValues>({
  label,
  required,
  ...rest
}: FormTextAreaProps<TFields>) => {
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
    <TextArea
      label={label}
      required={required}
      errorMessage={error?.message}
      {...field}
    />
  );
};

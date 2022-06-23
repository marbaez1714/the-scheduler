import { TextField } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { FormTextFieldProps } from './types';

const FormTextField = <T extends FieldValues>({
  label,
  className,
  multiline,
  ...rest
}: FormTextFieldProps<T>) => {
  // - HOOKS - //
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({ ...rest });

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <TextField
      className={className}
      multiline={multiline}
      type="text"
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      value={value}
      ref={ref}
    />
  );
};

export default FormTextField;

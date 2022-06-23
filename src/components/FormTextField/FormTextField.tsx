import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import { FormTextFieldProps } from './types';

const FormTextField = ({ label, ...rest }: FormTextFieldProps) => {
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

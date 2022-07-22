import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FieldValues, useController } from 'react-hook-form';
import { FormDatePickerProps } from './types';

const FormDatePicker = <TFieldValues extends FieldValues>({
  label,
  className,
  ...rest
}: FormDatePickerProps<TFieldValues>) => {
  // - HOOKS - //
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController(rest);

  // - JSX - //
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      ref={ref}
      renderInput={(params) => <TextField {...params} onBlur={onBlur} className={className} name={name} />}
    />
  );
};

export default FormDatePicker;

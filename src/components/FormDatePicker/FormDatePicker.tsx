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

  const handleChange = (value: Date | null, keyboardInputValue?: string) => {
    onChange(value?.toISOString(), keyboardInputValue);
  };

  // - JSX - //
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={handleChange}
      ref={ref}
      renderInput={(params) => <TextField {...params} onBlur={onBlur} className={className} name={name} />}
    />
  );
};

export default FormDatePicker;

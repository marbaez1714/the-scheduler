import { Autocomplete, TextField } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { FormAutocompleteProps } from './types';

const FormAutocomplete = <TFieldValues extends FieldValues>({
  label,
  options,
  ...rest
}: FormAutocompleteProps<TFieldValues>) => {
  // - HOOKS - //
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController(rest);

  // - HELPERS - //
  const getValue = () => {
    const missingLabel = { label: 'Missing Label', value };
    const selectedOption = options.find((option) => option.value === value);

    return value ? selectedOption || missingLabel : null;
  };

  // - JSX - //
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options}
      value={getValue()}
      onBlur={onBlur}
      ref={ref}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          required={!!rest.rules?.required}
          name={name}
          label={label}
          variant="outlined"
        />
      )}
      onChange={(_, data) => onChange(data?.value || '')}
    />
  );
};

export default FormAutocomplete;

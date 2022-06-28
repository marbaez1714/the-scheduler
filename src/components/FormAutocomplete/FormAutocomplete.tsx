import { FieldValues, useController } from 'react-hook-form';
import { FormAutocompleteProps } from './types';

const FormAutocomplete = <T extends FieldValues>({
  label,
  className,
  ...rest
}: FormAutocompleteProps<T>) => {
  // - HOOKS - //
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({ ...rest });

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return <></>;
};

export default FormAutocomplete;

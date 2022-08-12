import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Content, FormTextField } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/forms';

export const SupplierAddForm = () => {
  // - HOOKS - //
  // Firebase
  const { loading: loadingData, createDocument } = useFirebase();
  // Navigation
  const navigate = useNavigate();

  // - FORM - //
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.supplier,
  });

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = (data: AddFormData['supplier']) => {
    createDocument('Supplier', data).then(() => reset());
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loadingData}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
        {/* Title */}
        <h1 className="form-title">Add a Supplier</h1>
        {/* Name */}
        <FormTextField label="Supplier Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Phone Number */}
        <FormTextField label="Phone Number" name="primaryPhone" control={control} />
        {/* Notes */}
        <FormTextField className="col-span-2" label="Notes" name="notes" control={control} multiline />
        {/* Actions */}
        <div className="col-span-2 space-x-2 text-right">
          <Button onClick={() => reset()}>Clear</Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Content>
  );
};

import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Content, FormTextField } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/formTypes';

export const CompanyAddForm = () => {
  // - HOOKS - //
  // Firebase
  const { loading: loadingData, createDocument } = useFirebase();
  // Navigation
  const navigate = useNavigate();

  // - FORMS - //
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.company,
  });

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = (data: AddFormData['company']) => {
    createDocument('Company', data).then(() => reset());
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loadingData}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
        {/* Title */}
        <h1 className="form-title">Add a Company</h1>
        {/* Company Name */}
        <FormTextField label="Company Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Address */}
        <FormTextField label="Address" name="primaryAddress" control={control} />
        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />
        {/* Phone number */}
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

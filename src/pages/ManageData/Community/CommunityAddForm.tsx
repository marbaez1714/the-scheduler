import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, FormAutocomplete, FormTextField } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { useOptions } from 'src/hooks/useOptions';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/forms';

export const CommunityAddForm = () => {
  // - HOOKS - //
  const { companyOptions } = useOptions();
  const { loading: loadingData, createDocument } = useFirebase();
  const navigate = useNavigate();

  // - FORM - //
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.community,
  });

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = (data: AddFormData['community']) => {
    createDocument('Community', data).then(() => reset());
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loadingData}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
        {/* Title */}
        <h1 className="form-title">Add a Community</h1>

        {/* Company REQUIRED */}
        <FormAutocomplete
          label="Company"
          control={control}
          name="companyId"
          rules={formRules.requiredNonEmptyString}
          options={companyOptions}
        />

        {/* Name REQUIRED */}
        <FormTextField label="Name" control={control} name="name" rules={formRules.requiredNonEmptyString} />

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

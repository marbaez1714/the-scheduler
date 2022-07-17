import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, FormTextField } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/formTypes';

export const ReporterAddForm = () => {
  // - HOOKS - //
  // Firebase
  const { loading: loadingData, reporterCreate, refreshStoreData } = useFirebase();
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
    defaultValues: AddFormDefaultData.reporter,
  });

  // - STATE - //
  const [createLoading, setCreateLoading] = useState(false);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submitReporter = async (data: AddFormData['reporter']) => {
    try {
      setCreateLoading(true);
      // Create new reporter
      await reporterCreate(data);
      // Refresh reporters in data store
      await refreshStoreData('Reporter');
      // Reset inputs
      reset();
    } catch (e: any) {
      e.message && toast.error(e.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={createLoading || loadingData}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submitReporter)}>
        {/* Title */}
        <h1 className="form-title">Add a Reporter</h1>
        {/* Name REQUIRED */}
        <FormTextField label="Reporter Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />
        {/* Phone number REQUIRED */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
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

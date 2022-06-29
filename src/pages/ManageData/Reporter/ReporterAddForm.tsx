import { IconButton, Button } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AddFormData } from 'src/utils/forms/types';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { FormTextField } from 'src/components/FormTextField';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const ReporterAddForm = () => {
  // - HOOKS - //
  // Firebase
  const {
    loading: loadingData,
    reportersCreate,
    refreshStoreData,
  } = useFirebase();
  // Navigation
  const navigate = useNavigate();

  // - FORM - //
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<AddFormData['reporter']>({
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
      await reportersCreate(data);
      // Refresh reporters in data store
      await refreshStoreData.reporters();
      // Reset inputs
      reset();
    } catch (e: any) {
      e.message && toast.error(e.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <Content
      className="flex flex-grow items-start space-x-4"
      loading={createLoading || loadingData}
    >
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="form-card grid-cols-2"
        onSubmit={handleSubmit(submitReporter)}
      >
        {/* Title */}
        <h1 className="form-title">Add a Reporter</h1>
        {/* Name REQUIRED */}
        <FormTextField
          label="Reporter Name"
          name="name"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
        {/* Email REQUIRED */}
        <FormTextField
          label="Email"
          name="primaryEmail"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
        {/* Phone number REQUIRED */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
        {/* Notes */}
        <FormTextField
          className="col-span-2"
          label="Notes"
          name="notes"
          control={control}
          multiline
        />
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

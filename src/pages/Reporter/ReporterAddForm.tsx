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
  // Form
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<AddFormData['reporter']>({
    mode: 'all',
    defaultValues: AddFormDefaultData.reporter,
  });
  // Firebase
  const { reportersCreate, refreshStoreData } = useFirebase();
  // Navigation
  const navigate = useNavigate();

  // - STATE - //
  const [loading, setLoading] = useState(false);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submitReporter = async (data: AddFormData['reporter']) => {
    try {
      setLoading(true);
      // Create new reporter
      await reportersCreate(data);
      // Refresh reporters in data store
      await refreshStoreData.reporters();
      // Reset inputs
      reset();
      setLoading(false);
    } catch (e: any) {
      e.message && toast.error(e.message);
    }
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loading}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="form-card grid-cols-2"
        onSubmit={handleSubmit(submitReporter)}
      >
        {/* Title */}
        <h1 className="form-title">Add a Reporter</h1>
        {/* Name */}
        <FormTextField
          label="Reporter Name"
          name="name"
          control={control}
          rules={formRules.isNotEmpty}
        />
        {/* Email */}
        <FormTextField
          label="Email"
          name="primaryEmail"
          control={control}
          rules={formRules.isNotEmpty}
        />
        {/* Phone number */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.isNotEmpty}
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

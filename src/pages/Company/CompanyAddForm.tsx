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

export const CompanyAddForm = () => {
  // - HOOKS - //
  // Form
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<AddFormData['company']>({
    mode: 'all',
    defaultValues: AddFormDefaultData.company,
  });
  // Firebase
  const { companiesCreate, refreshStoreData } = useFirebase();
  // Navigation
  const navigate = useNavigate();

  // - STATE - //
  const [loading, setLoading] = useState(false);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submitCompany = async (data: AddFormData['company']) => {
    try {
      setLoading(true);
      // Create new company
      await companiesCreate(data);
      // Refresh companies in data store
      await refreshStoreData.companies();
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
        onSubmit={handleSubmit(submitCompany)}
      >
        {/* Title */}
        <h1 className="form-title">Add a Company</h1>
        {/* Company Name */}
        <FormTextField
          label="Company Name"
          name="name"
          control={control}
          rules={formRules.isNotEmpty}
        />
        {/* Address */}
        <FormTextField
          label="Address"
          name="primaryAddress"
          control={control}
        />
        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />
        {/* Phone number */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
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

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

export const ContractorAddForm = () => {
  // - HOOKS - //
  // Firebase
  const { loading: loadingData, contractorCreate, refreshStoreData } = useFirebase();
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
    defaultValues: AddFormDefaultData.contractor,
  });

  // - STATE - //
  const [createLoading, setCreateLoading] = useState(false);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = async (data: AddFormData['contractor']) => {
    try {
      setCreateLoading(true);
      // Create new contractor
      await contractorCreate(data);
      // Refresh contractor in data store
      await refreshStoreData('Contractor');
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
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
        {/* Title */}
        <h1 className="form-title">Add a Contractor</h1>
        {/* Name */}
        <FormTextField label="Full Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Phone Number */}
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

import { IconButton, Button } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AddFormData } from 'src/utils/formTypes';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { FormTextField } from 'src/components/FormTextField';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const ScopeAddForm = () => {
  // - HOOKS - //
  // Firebase
  const { loading: loadingData, scopeCreate, refreshStoreData } = useFirebase();
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
    defaultValues: AddFormDefaultData.scope,
  });

  // - STATE - //
  const [createLoading, setCreateLoading] = useState(false);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = async (data: AddFormData['scope']) => {
    try {
      setCreateLoading(true);
      // Create new scope
      await scopeCreate(data);
      // Refresh scopes in data store
      await refreshStoreData.scopes();
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
        <h1 className="form-title">Add a Scopes</h1>
        {/* Name REQUIRED */}
        <FormTextField label="Scope Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Name (Spanish) REQUIRED */}
        <FormTextField
          label="Translation"
          name="nameSpanish"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
        {/* Description REQUIRED */}
        <FormTextField
          control={control}
          label="Description"
          name="description"
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

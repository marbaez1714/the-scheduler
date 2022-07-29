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

export const ScopeAddForm = () => {
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
    defaultValues: AddFormDefaultData.scope,
  });

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = (data: AddFormData['scope']) => {
    createDocument('Scope', data).then(() => reset());
  };

  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loadingData}>
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
        {/* Description */}
        <FormTextField control={control} label="Description" name="description" />
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

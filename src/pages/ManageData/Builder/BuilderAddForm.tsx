import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Content, FormAutocomplete, FormAutocompleteOption, FormTextField } from 'src/components';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/formTypes';

export const BuilderAddForm = () => {
  // - HOOKS - //
  // Firebase
  const {
    loading: loadingData,
    builderCreate,
    storeData: { companies: companiesData },
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
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.builder,
  });

  // - STATE - //
  const [createLoading, setCreateLoading] = useState(false);
  const [companyOptions, setCompanyOptions] = useState<FormAutocompleteOption[]>([]);

  // - EFFECTS - //
  useEffect(() => {
    if (companiesData?.documents.length) {
      setCompanyOptions(
        companiesData.documents.map((doc) => ({
          label: doc.name || 'Missing Name',
          value: doc.id,
        }))
      );
    }
  }, [companiesData]);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submit = async (data: AddFormData['builder']) => {
    try {
      setCreateLoading(true);
      // Create new builder
      await builderCreate(data);
      // Refresh builders in data store
      await refreshStoreData('Builder');
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
        <h1 className="form-title">Add a Builder</h1>

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

        {/* Phone Number REQUIRED */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />

        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />

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

import { useEffect, useState } from 'react';
import { IconButton, Button } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AddFormData } from 'src/utils/forms/types';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import {
  FormAutocomplete,
  FormAutocompleteOption,
} from 'src/components/FormAutocomplete';
import { FormTextField } from 'src/components/FormTextField';
import toast from 'react-hot-toast';

export const CommunityAddForm = () => {
  // - HOOKS - //
  // Firebase
  const {
    loading: loadingData,
    communitiesCreate,
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
  } = useForm<AddFormData['community']>({
    mode: 'all',
    defaultValues: AddFormDefaultData.community,
  });

  // - STATE - //
  const [createLoading, setCreateLoading] = useState(false);
  const [companyOptions, setCompanyOptions] = useState<
    FormAutocompleteOption[]
  >([]);

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

  const submit = async (data: AddFormData['community']) => {
    try {
      setCreateLoading(true);
      // Create new community
      await communitiesCreate(data);
      // Refresh communities in data store
      await refreshStoreData.communities();
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
        <FormTextField
          label="Name"
          control={control}
          name="name"
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
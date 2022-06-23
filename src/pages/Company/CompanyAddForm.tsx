import { FormEventHandler } from 'react';
import { IconButton, Button, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { AddFormData } from 'src/utils/forms/types';
import { formRules } from 'src/utils/forms';

export const CompanyAddForm = () => {
  // - HOOKS - //
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<AddFormData['company']>({
    mode: 'all',
    defaultValues: {
      name: '',
      primaryAddress: '',
      primaryEmail: '',
      primaryPhone: '',
      notes: '',
    },
  });

  const { companiesCreate, refreshStoreData } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const submitCompany: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // try {
    //   // Create new company
    //   await companiesCreate({});
    //   // Refresh companies in data store
    //   await refreshStoreData.companies();
    //   // Reset inputs
    //   resetInputs();
    // } catch (e: any) {
    //   e.message && toast.error(e.message);
    // }
  };

  // - HELPERS - //

  return (
    <Content className="flex flex-grow items-start space-x-4">
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="w-full grid grid-cols-2 gap-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        {/* Company Name */}
        <Controller
          name="name"
          control={control}
          rules={formRules.isNotEmpty}
          render={({ field }) => <TextField label="Company Name" {...field} />}
        />
        {/* Address */}
        <Controller
          name="primaryAddress"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              label="Address"
              value={value}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        {/* Email */}
        <Controller
          name="primaryEmail"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              label="Email"
              value={value}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        {/* Phone number */}
        <Controller
          name="primaryPhone"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              label="Phone Number"
              value={value}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        {/* notes */}
        <Controller
          name="notes"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              label="Notes"
              multiline
              value={value}
              onChange={onChange}
              ref={ref}
            />
          )}
        />

        {/* Actions */}
        <div className="col-span-2 text-right">
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Content>
  );
};

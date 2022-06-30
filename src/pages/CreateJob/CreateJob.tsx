import { Button, Divider, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Content } from 'src/components/Content';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormDatePicker } from 'src/components/FormDatePicker';
import { FormTextField } from 'src/components/FormTextField';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';

const CreateJob = () => {
  // ----- HOOKS ----- //
  const { storeData } = useFirebase();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm();

  // ----- STATE ----- //

  // ----- EFFECTS ----- //

  // ----- ACTIONS ----- //

  // ----- FORM OPTIONS ----- //
  const areaOptions = useMemo(() => {
    const documents = storeData.areas?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.areas]);

  const builderOptions = useMemo(() => {
    const documents = storeData.builders?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.builders]);

  const communityOptions = useMemo(() => {
    const documents = storeData.communities?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.communities]);

  const contractorsOptions = useMemo(() => {
    const documents = storeData.contractors?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.contractors]);

  const reporterOptions = useMemo(() => {
    const documents = storeData.reporters?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.reporters]);

  const scopeOptions = useMemo(() => {
    const documents = storeData.scopes?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.scopes]);

  const supplierOptions = useMemo(() => {
    const documents = storeData.suppliers?.documents ?? [];
    return documents.map((item) => ({ label: item.name, value: item.id }));
  }, [storeData.suppliers]);

  // ----- HELPERS ----- //
  // ----- JSX ----- //
  return (
    <Screen title="Create a Job">
      <Content>
        <form className="form-card grid-cols-2" onSubmit={console.log}>
          <h1 className="form-title col-span-2">Create a New Job</h1>

          {/* Address */}
          <FormTextField
            className="col-span-2"
            control={control}
            label="Address"
            name=""
          />

          <FormDatePicker
            className="col-span-2"
            control={control}
            label="Start Date"
            name=""
          />

          {/* Community */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Community"
            options={communityOptions}
            name={''}
          />
          {/* Builder */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Builder"
            options={builderOptions}
            name={''}
          />

          {/* Installer */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Installer"
            options={contractorsOptions}
            name={''}
          />
          {/* Reporter */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Reporter"
            options={reporterOptions}
            name={''}
          />
          {/* Scope */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Scope"
            options={scopeOptions}
            name={''}
          />
          {/* Area */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Area"
            options={areaOptions}
            name={''}
          />

          <FormTextField
            className="col-span-1"
            control={control}
            label="Line Item 1"
            name=""
          />

          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Supplier 1"
            options={supplierOptions}
            name={''}
          />

          <FormTextField
            className="col-span-1"
            control={control}
            label="Line Item 2"
            name=""
          />

          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Supplier 2"
            options={supplierOptions}
            name={''}
          />

          <FormTextField
            className="col-span-2"
            control={control}
            label="Notes"
            name=""
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
    </Screen>
  );
};

export default CreateJob;

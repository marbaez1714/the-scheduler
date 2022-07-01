import { ChangeEventHandler, useMemo, useState } from 'react';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Content } from 'src/components/Content';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormDatePicker } from 'src/components/FormDatePicker';
import { FormTextField } from 'src/components/FormTextField';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';
import { CreateJobDefaultData, formRules } from 'src/utils/forms';
import { CreateJobData, LineItem } from 'src/utils/forms/types';
import { AddCircle, Delete } from '@mui/icons-material';

const CreateJob = () => {
  // ----- HOOKS ----- //
  const { storeData } = useFirebase();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<CreateJobData>({
    mode: 'all',
    defaultValues: CreateJobDefaultData,
  });

  // ----- STATE ----- //
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSupplierId, setOrderSupplierId] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  // ----- EFFECTS ----- //

  // ----- ACTIONS ----- //
  const submit = (data: CreateJobData) => {
    console.log(data);
  };

  const handleOrderNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleOrderSupplierChange = (id: string) => {
    setOrderSupplierId(id);
  };

  const handleAddLineItemClick = () => {
    setLineItems((prev) => [
      ...prev,
      {
        orderNumber: orderNumber,
        supplierId: orderSupplierId,
      },
    ]);
    setOrderNumber('');
    setOrderSupplierId('');
  };

  const removeLineItem = (index: number) => {
    setLineItems((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  };

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
  const getOrderSupplierValue = () => {
    const missingLabel = { label: 'Missing Label', value: orderSupplierId };
    const selectedOption = supplierOptions.find(
      (option) => option.value === orderSupplierId
    );

    return orderSupplierId ? selectedOption || missingLabel : null;
  };

  // ----- JSX ----- //
  return (
    <Screen title="Create Job">
      <Content>
        <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
          {/* Location  */}
          <h2 className="col-span-2 text-xl tracking-wide">Location</h2>
          {/* Address */}
          <FormTextField
            className="col-span-1"
            control={control}
            rules={formRules.requiredNonEmptyString}
            label="Address"
            name="address"
          />
          {/* Community */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Community"
            options={communityOptions}
            name="communityId"
          />

          {/* Job Information */}
          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">
            Job Information
          </h2>

          <FormDatePicker
            className="col-span-1"
            control={control}
            label="Start Date"
            name="startDate"
          />

          {/* Builder */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Builder"
            options={builderOptions}
            name="builderId"
          />

          {/* Contractor */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Contractor"
            options={contractorsOptions}
            name="contractorId"
          />
          {/* Reporter */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Reporter"
            options={reporterOptions}
            name="reporterId"
          />
          {/* Scope */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Scope of Work"
            options={scopeOptions}
            name="scopeId"
          />
          {/* Area */}
          <FormAutocomplete
            className="col-span-1"
            control={control}
            label="Area"
            options={areaOptions}
            name="areaId"
          />

          {/* Line Items */}
          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">
            Order Information
          </h2>
          <div className="col-span-2 pb-4 space-y-6">
            {/* Inputs */}
            <div className="flex items-center space-x-6">
              {/* Order Number Input */}
              <TextField
                className="w-1/2"
                label="Order Number"
                value={orderNumber}
                onChange={handleOrderNumberChange}
              />
              {/* Supplier Select */}
              <Autocomplete
                className="w-1/2"
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                options={supplierOptions}
                value={getOrderSupplierValue()}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Supplier" variant="outlined" />
                )}
                onChange={(_, data) =>
                  handleOrderSupplierChange(data?.value || '')
                }
              />
              <IconButton
                onClick={handleAddLineItemClick}
                disabled={!orderNumber || !orderSupplierId}
              >
                <AddCircle />
              </IconButton>
            </div>

            <table className="text-left">
              <thead>
                <tr>
                  <th className="py-2 px-2">Order Number</th>
                  <th className="py-2 px-2">Supplier</th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-2">
                      {index + 1} - {item.orderNumber}
                    </td>
                    <td className="py-2 px-2">{item.supplierId}</td>
                    <td className="py-2 px-2">
                      <button>
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">
            Detail
          </h2>

          <FormTextField
            multiline
            className="col-span-2"
            control={control}
            label="Notes"
            name="notes"
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

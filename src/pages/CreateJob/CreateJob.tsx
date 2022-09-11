import { ChangeEventHandler, useState } from 'react';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Content, FormAutocomplete, FormDatePicker, FormTextField, LineItemTable, Screen } from 'src/components';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddCircle } from '@mui/icons-material';
import { AppMessages } from 'src/utils/messages';
import { LineItem } from 'src/utils/cloudFunctionTypes';
import { toast } from 'react-hot-toast';
import { useOptions } from 'src/hooks/useOptions';
import { CreateJobLegacyInput, useCreateJobLegacyMutation } from 'src/api';

const CreateJob = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    areaOptions,
    builderOptions,
    contractorsOptions,
    communityOptions,
    reporterOptions,
    scopeOptions,
    supplierOptions,
  } = useOptions();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.jobLegacy,
  });
  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSupplierId, setOrderSupplierId] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateJobLegacyMutation({
    onCompleted: (data) => {
      toast.success(data.createJobLegacy.message);
      setOrderNumber('');
      setOrderSupplierId('');
      setLineItems([]);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  const submit = async (data: CreateJobLegacyInput) => {
    create({ variables: { data } });
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
      const allLineItems = prev;
      allLineItems.splice(index, 1);
      return [...allLineItems];
    });
  };

  const handleReset = () => {
    const resetConfirmed = confirm(AppMessages.ConfirmReset);
    if (resetConfirmed) {
      setOrderNumber('');
      setOrderSupplierId('');
      setLineItems([]);
      reset();
    }
  };

  const getOrderSupplierValue = () => {
    const missingLabel = { label: 'Missing Label', value: orderSupplierId };
    const selectedOption = supplierOptions.find((option) => option.value === orderSupplierId);

    return orderSupplierId ? selectedOption || missingLabel : null;
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Content loading={loading}>
        <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
          {/* Location  */}
          <h2 className="text-xl tracking-wide col-span-2">Location</h2>
          {/* Address */}
          <FormTextField
            className="col-span-1"
            control={control}
            rules={formRules.requiredNonEmptyString}
            label="Address"
            name="name"
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
          <h2 className="pt-4 text-xl tracking-wide border-t col-span-2">Job Information</h2>

          <FormDatePicker className="col-span-1" control={control} label="Start Date" name="startDate" />

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
          <FormAutocomplete className="col-span-1" control={control} label="Area" options={areaOptions} name="areaId" />

          {/* Line Items */}
          <h2 className="pt-4 text-xl tracking-wide border-t col-span-2">Order Information</h2>
          <div className="flex items-center col-span-2 space-x-6">
            {/* Order Number Input */}
            <TextField className="w-1/2" label="Order Number" value={orderNumber} onChange={handleOrderNumberChange} />
            {/* Supplier Select */}
            <Autocomplete
              className="w-1/2"
              isOptionEqualToValue={(option, value) => option.value === value.value}
              options={supplierOptions}
              value={getOrderSupplierValue()}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label="Supplier" variant="outlined" />}
              onChange={(_, data) => handleOrderSupplierChange(data?.value || '')}
            />
            <IconButton onClick={handleAddLineItemClick} disabled={!orderNumber || !orderSupplierId}>
              <AddCircle />
            </IconButton>
          </div>
          {lineItems.length > 0 && <LineItemTable lineItems={lineItems} onRemove={removeLineItem} />}

          <h2 className="pt-4 text-xl tracking-wide border-t col-span-2">Detail</h2>

          <FormTextField multiline className="col-span-2" control={control} label="Notes" name="notes" />

          {/* Actions */}
          <div className="text-right col-span-2 space-x-2">
            <Button onClick={handleReset}>Clear</Button>
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

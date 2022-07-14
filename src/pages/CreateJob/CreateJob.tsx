import { ChangeEventHandler, useState } from 'react';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Content } from 'src/components/Content';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormDatePicker } from 'src/components/FormDatePicker';
import { FormTextField } from 'src/components/FormTextField';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { AddFormData } from 'src/utils/formTypes';
import { AddCircle } from '@mui/icons-material';
import { LineItemTable } from 'src/components/LineItemTable';
import { AppMessages } from 'src/utils/messages';
import { LineItem } from 'src/utils/cloudFunctionTypes';
import { toast } from 'react-hot-toast';
import { useOptions } from 'src/hooks/useOptions';

const CreateJob = () => {
  // ----- HOOKS ----- //
  const { jobLegacyCreate } = useFirebase();
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

  // ----- STATE ----- //
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSupplierId, setOrderSupplierId] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  const [createLoading, setCreateLoading] = useState(false);

  // ----- EFFECTS ----- //

  // ----- ACTIONS ----- //
  const submit = async (data: AddFormData['jobLegacy']) => {
    try {
      setCreateLoading(true);
      // Create the new job
      await jobLegacyCreate({
        ...data,
        lineItems: lineItems,
        startDate: data.startDate?.getTime(),
      });
      // Reset inputs
      setOrderNumber('');
      setOrderSupplierId('');
      setLineItems([]);
      reset();
    } catch (e: any) {
      e.message && toast.error(e.message);
    } finally {
      setCreateLoading(false);
    }
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

  // ----- HELPERS ----- //
  const getOrderSupplierValue = () => {
    const missingLabel = { label: 'Missing Label', value: orderSupplierId };
    const selectedOption = supplierOptions.find((option) => option.value === orderSupplierId);

    return orderSupplierId ? selectedOption || missingLabel : null;
  };

  // ----- JSX ----- //
  return (
    <Screen>
      <Content loading={createLoading}>
        <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
          {/* Location  */}
          <h2 className="col-span-2 text-xl tracking-wide">Location</h2>
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
          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">Job Information</h2>

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
          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">Order Information</h2>
          <div className="col-span-2 space-x-6 flex items-center">
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

          <h2 className="col-span-2 text-xl tracking-wide pt-4 border-t">Detail</h2>

          <FormTextField multiline className="col-span-2" control={control} label="Notes" name="notes" />

          {/* Actions */}
          <div className="col-span-2 space-x-2 text-right">
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

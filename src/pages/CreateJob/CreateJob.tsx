import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { useOptions } from 'src/hooks/useOptions';
import { CreateJobForm } from 'src/utils/forms';

const CreateJob = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    builderOptions,
    communityOptions,
    contractorsOptions,
    reporterOptions,
    areaOptions,
    scopeOptions,
  } = useOptions();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: CreateJobForm.defaultValues,
    resolver: CreateJobForm.resolver,
  });

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: any) => {
    console.log(data);
  };
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content centerHorizontal loading={false}>
        <Form
          title="Create New Job"
          onSubmit={handleSubmit(submit)}
          onClearClick={() => reset()}
          isValid={isValid}
        >
          {/******************************/}
          {/* Address / Name             */}
          {/******************************/}
          <Form.TextInput
            label={CreateJobForm.labels.name}
            control={control}
            name="name"
            required
          />
          {/******************************/}
          {/* Community                    */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.communityId}
            control={control}
            name="communityId"
            options={communityOptions}
          />

          {/******************************/}
          {/* Start Date                 */}
          {/******************************/}
          <Form.DateInput
            label={CreateJobForm.labels.startDate}
            control={control}
            name="startDate"
          />

          {/******************************/}
          {/* Builder                    */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.builderId}
            control={control}
            name="builderId"
            options={builderOptions}
          />

          {/******************************/}
          {/* Contractor                 */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.contractorId}
            control={control}
            name="contractorId"
            options={contractorsOptions}
          />

          {/******************************/}
          {/* Reporter                   */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.reporterId}
            control={control}
            name="reporterId"
            options={reporterOptions}
          />

          {/******************************/}
          {/* Area                       */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.areaId}
            control={control}
            name="areaId"
            options={areaOptions}
          />

          {/******************************/}
          {/* Scope                      */}
          {/******************************/}
          <Form.AutocompleteInput
            label={CreateJobForm.labels.scopeId}
            control={control}
            name="scopeId"
            options={scopeOptions}
          />

          {/******************************/}
          {/* LINE ITEMS GO HERE         */}
          {/******************************/}

          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <Form.TextAreaInput
            label={CreateJobForm.labels.notes}
            control={control}
            name="notes"
          />
        </Form>
      </Screen.Content>
    </Screen>
  );
};

export default CreateJob;

{
  /* <Screen>
      <Content loading={createLoading}>
        <form className="grid-cols-2 form-card" onSubmit={handleSubmit(submit)}>
          {/* Location  */
}
// <h2 className="col-span-2 text-xl tracking-wide">Location</h2>
{
  /* Address */
}
// <FormTextField
//   className="col-span-1"
//   control={control}
//   rules={formRules.requiredNonEmptyString}
//   label="Address"
//   name="name"
// />
{
  /* Community */
}
// <FormAutocomplete
// className="col-span-1"
// control={control}
//   label="Community"
//   options={communityOptions}
//   name="communityId"
// />

{
  /* Job Information */
}
// <h2 className="col-span-2 pt-4 text-xl tracking-wide border-t">Job Information</h2>

// <FormDatePicker className="col-span-1" control={control} label="Start Date" name="startDate" />

{
  /* Builder */
}
// <FormAutocomplete
//   className="col-span-1"
//   control={control}
//   label="Builder"
//   options={builderOptions}
//   name="builderId"
// />

{
  /* Contractor */
}
// <FormAutocomplete
//   className="col-span-1"
//   control={control}
//   label="Contractor"
//   options={contractorsOptions}
//   name="contractorId"
// />
{
  /* Reporter */
}
// <FormAutocomplete
//   className="col-span-1"
//   control={control}
//   label="Reporter"
//   options={reporterOptions}
//   name="reporterId"
// />
{
  /* Scope */
}
// <FormAutocomplete
//   className="col-span-1"
//   control={control}
//   label="Scope of Work"
//   options={scopeOptions}
//   name="scopeId"
// />
{
  /* Area */
}
// <FormAutocomplete className="col-span-1" control={control} label="Area" options={areaOptions} name="areaId" />

{
  /* Line Items */
}
// <h2 className="col-span-2 pt-4 text-xl tracking-wide border-t">Order Information</h2>
// <div className="flex items-center col-span-2 space-x-6">
{
  /* Order Number Input */
}
{
  /* <TextField className="w-1/2" label="Order Number" value={orderNumber} onChange={handleOrderNumberChange} /> */
}
{
  /* Supplier Select */
}
{
  /* <Autocomplete
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

          <h2 className="col-span-2 pt-4 text-xl tracking-wide border-t">Detail</h2>

          <FormTextField multiline className="col-span-2" control={control} label="Notes" name="notes" /> */
}

{
  /* Actions */
}
// <div className="col-span-2 space-x-2 text-right">
//   <Button onClick={handleReset}>Clear</Button>
//   <Button variant="contained" type="submit" disabled={!isValid}>
//     Submit
//   </Button>
// </div>
// </form>
// </Content>
// </Screen> */}

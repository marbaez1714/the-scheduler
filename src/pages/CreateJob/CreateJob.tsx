import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { useOptions } from 'src/hooks/useOptions';
import { CreateJobForm } from 'src/utils/forms';
import { CreateJobLegacyInput, useCreateJobLegacyMutation } from 'src/api';

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
    supplierOptions,
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
  const [createJobLegacy] = useCreateJobLegacyMutation({
    onCompleted: (data) => {
      toast.success(data.createJobLegacy.message);
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
  const submit = (data: CreateJobLegacyInput) => {
    createJobLegacy({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content centerHorizontal loading={false}>
        <Form
          title="Create New Job"
          className="w-1/2"
          onSubmit={handleSubmit(submit)}
          onClearClick={() => reset()}
          isValid={isValid}
        >
          <div className="grid grid-cols-8 gap-4">
            {/******************************/}
            {/* Address / Name             */}
            {/******************************/}
            <div className="col-span-5">
              <Form.TextInput
                label={CreateJobForm.labels.name}
                control={control}
                name="name"
                required
              />
            </div>

            {/******************************/}
            {/* Start Date                 */}
            {/******************************/}
            <div className="col-span-3">
              <Form.DateInput
                label={CreateJobForm.labels.startDate}
                control={control}
                name="startDate"
              />
            </div>

            {/******************************/}
            {/* Community                  */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.communityId}
                control={control}
                name="communityId"
                options={communityOptions}
              />
            </div>

            {/******************************/}
            {/* Builder                    */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.builderId}
                control={control}
                name="builderId"
                options={builderOptions}
              />
            </div>

            {/******************************/}
            {/* Contractor                 */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.contractorId}
                control={control}
                name="contractorId"
                options={contractorsOptions}
              />
            </div>

            {/******************************/}
            {/* Reporter                   */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.reporterId}
                control={control}
                name="reporterId"
                options={reporterOptions}
              />
            </div>

            {/******************************/}
            {/* Area                       */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.areaId}
                control={control}
                name="areaId"
                options={areaOptions}
              />
            </div>
            {/******************************/}
            {/* Scope                      */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={CreateJobForm.labels.scopeId}
                control={control}
                name="scopeId"
                options={scopeOptions}
              />
            </div>

            {/******************************/}
            {/* Line Items                 */}
            {/******************************/}
            <div className="col-span-8">
              <Form.LintItemInput
                control={control}
                name="lineItems"
                label={CreateJobForm.labels.lineItems}
                suppliers={supplierOptions}
              />
            </div>

            {/******************************/}
            {/* Notes                      */}
            {/******************************/}
            <div className="col-span-8">
              <Form.TextAreaInput
                label={CreateJobForm.labels.notes}
                control={control}
                name="notes"
              />
            </div>
          </div>
        </Form>
      </Screen.Content>
    </Screen>
  );
};

export default CreateJob;

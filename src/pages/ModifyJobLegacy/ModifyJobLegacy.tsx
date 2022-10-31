import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ModifyJobLegacyInput,
  useGetJobLegacyByIdQuery,
  useModifyJobLegacyMutation,
} from 'src/api';
import { Form } from 'src/components/Form';
import { Screen } from 'src/components/Screen';
import { useOptions } from 'src/hooks/useOptions';
import { EditJobForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

const ModifyJobLegacy = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    areaOptions,
    builderOptions,
    communityOptions,
    contractorsOptions,
    reporterOptions,
    scopeOptions,
    supplierOptions,
  } = useOptions();
  const { jobLegacyId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: EditJobForm.defaultValues,
    resolver: EditJobForm.resolver,
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
  const { loading: getLoading } = useGetJobLegacyByIdQuery({
    skip: !jobLegacyId,
    variables: { id: jobLegacyId ?? '' },
    onCompleted: ({ jobLegacyById }) => {
      if (!jobLegacyById) {
        throw new Error();
      }

      reset({
        name: jobLegacyById.name,
        areaId: jobLegacyById.areaId ?? '',
        builderId: jobLegacyById.builderId ?? '',
        communityId: jobLegacyById.communityId ?? '',
        contractorId: jobLegacyById.contractorId ?? '',
        reporterId: jobLegacyById.reporterId ?? '',
        startDate: jobLegacyById.startDate ?? '',
        scopeId: jobLegacyById.scopeId ?? '',
        notes: jobLegacyById.notes ?? '',
        lineItems: jobLegacyById.lineItems,
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyJobLegacyMutation({
    onCompleted: (data) => {
      toast.success(data.modifyJobLegacy.message);
      // navigate(-1);
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
  const submit = (data: ModifyJobLegacyInput) => {
    if (jobLegacyId) {
      modify({ variables: { id: jobLegacyId, data } });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
        <Form
          title="Edit Job"
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
                label={EditJobForm.labels.name}
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
                label={EditJobForm.labels.startDate}
                control={control}
                name="startDate"
              />
            </div>

            {/******************************/}
            {/* Community                  */}
            {/******************************/}
            <div className="col-span-8">
              <Form.AutocompleteInput
                label={EditJobForm.labels.communityId}
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
                label={EditJobForm.labels.builderId}
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
                label={EditJobForm.labels.contractorId}
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
                label={EditJobForm.labels.reporterId}
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
                label={EditJobForm.labels.areaId}
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
                label={EditJobForm.labels.scopeId}
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
                label={EditJobForm.labels.lineItems}
                suppliers={supplierOptions}
              />
            </div>

            {/******************************/}
            {/* Notes                      */}
            {/******************************/}
            <div className="col-span-8">
              <Form.TextAreaInput
                label={EditJobForm.labels.notes}
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

export default ModifyJobLegacy;
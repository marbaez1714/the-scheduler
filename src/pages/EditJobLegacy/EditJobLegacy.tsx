import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Form } from 'src/components/Form';
import { Screen } from 'src/components/Screen';
import { useOptions } from 'src/hooks/useOptions';
import { EditJobForm } from 'src/utils/forms';

const EditJobLegacy = () => {
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

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content centerHorizontal loading={false}>
        <Form
          title="Edit Job"
          className="w-1/2"
          onSubmit={handleSubmit(() => {})}
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

export default EditJobLegacy;

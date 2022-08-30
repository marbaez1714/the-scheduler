import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddBuilderForm } from 'src/utils/forms';
import { CreateBuilderInput, useCreateBuilderMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { useOptions } from 'src/hooks/useOptions';

export const BuilderAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { companyOptions } = useOptions();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddBuilderForm.defaultValues,
    resolver: AddBuilderForm.resolver,
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
  const [create, { loading }] = useCreateBuilderMutation({
    onCompleted: (data) => {
      toast.success(data.createBuilder.message);
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
  const submit = async (data: CreateBuilderInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer title="Add Builder" onSubmit={handleSubmit(submit)}>
        {/* Name */}
        <FormTextInputs label="Name" className="w-96" control={control} name="name" required />

        {/* Primary Phone */}
        <FormTextInputs label="Primary Phone Number" className="w-96" control={control} name="primaryPhone" required />

        {/* Primary Email */}
        <FormTextInputs label="Primary Email" className="w-96" control={control} name="primaryEmail" />

        {/* Company */}
        <FormAutocomplete label="Company" control={control} options={companyOptions} name="companyId" required />

        {/* Notes */}
        <FormTextArea label="Notes" className="w-96" control={control} name="notes" />

        {/* Form Actions */}
        <div className="flex justify-end pt-6 space-x-4">
          <Button onClick={() => reset()}>Clear</Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </FormContainer>
    </Content>
  );
};

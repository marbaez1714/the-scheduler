import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddCommunityForm } from 'src/utils/forms';
import { CreateCommunityInput, useCreateCommunityMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { useOptions } from 'src/hooks/useOptions';

export const CommunityAddForm = () => {
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
    defaultValues: AddCommunityForm.defaultValues,
    resolver: AddCommunityForm.resolver,
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
  const [create, { loading }] = useCreateCommunityMutation({
    onCompleted: (data) => {
      toast.success(data.createCommunity.message);
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
  const submit = (data: CreateCommunityInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer title="Add Community" onSubmit={handleSubmit(submit)}>
        {/* Name */}
        <FormTextInputs label="Name" className="w-96" control={control} name="name" required />

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

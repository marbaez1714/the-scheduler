import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddAreaForm } from 'src/utils/forms';
import { CreateAreaInput, useCreateAreaMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

export const AreaAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddAreaForm.defaultValues,
    resolver: AddAreaForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateAreaMutation({
    onCompleted: (data) => {
      toast.success(data.createArea.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = async (data: CreateAreaInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer title="Add Area" onSubmit={handleSubmit(submit)}>
        {/* Name */}
        <FormTextInputs label="Name" className="w-96" control={control} name="name" required />

        {/* Name Translation (Spanish) */}
        <FormTextInputs
          label="Name Translation (Spanish)"
          className="w-96"
          control={control}
          name="nameSpanish"
          required
        />

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

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddAreaForm } from 'src/utils/forms';
import { WriteAreaInput, useCreateAreaMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInput } from 'src/components/FormTextInput';
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
  const submit = async (data: WriteAreaInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content centerHorizontal loading={loading}>
      <FormContainer
        title="Add Area"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
        onClearClick={reset}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput label="Name" control={control} name="name" required />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <FormTextInput
          label="Name Translation (Spanish)"
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea label="Notes" control={control} name="notes" />
      </FormContainer>
    </Content>
  );
};

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteAreaForm } from 'src/utils/forms';
import { WriteAreaInput, useCreateAreaMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

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
    defaultValues: WriteAreaForm.defaultValues,
    resolver: WriteAreaForm.resolver,
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
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Area"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
        onClearClick={reset}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput label="Name" control={control} name="name" required />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <Form.TextInput
          label="Name Translation (Spanish)"
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextArea label="Notes" control={control} name="notes" />
      </Form>
    </Screen.Content>
  );
};

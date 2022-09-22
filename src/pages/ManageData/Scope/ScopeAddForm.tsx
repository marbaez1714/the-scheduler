import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteScopeForm } from 'src/utils/forms';
import { WriteScopeInput, useCreateScopeMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

export const ScopeAddForm = () => {
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
    defaultValues: WriteScopeForm.defaultValues,
    resolver: WriteScopeForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateScopeMutation({
    onCompleted: (data) => {
      toast.success(data.createScope.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: WriteScopeInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Scope"
        onSubmit={handleSubmit(submit)}
        onClearClick={() => reset()}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                    */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.nameSpanish}
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Description                */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.description}
          control={control}
          name="description"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextAreaInput
          label={WriteScopeForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

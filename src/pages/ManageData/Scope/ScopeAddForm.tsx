import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteScopeForm } from 'src/utils/forms';
import { WriteScopeInput, useCreateScopeMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { FormTextInput } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

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
    <Screen.Content className="flex flex-col items-center" loading={loading}>
      <FormContainer
        title="Add Scope"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                    */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.nameSpanish}
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Description                */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.description}
          control={control}
          name="description"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteScopeForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Screen.Content>
  );
};

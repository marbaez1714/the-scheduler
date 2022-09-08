import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddScopeForm } from 'src/utils/forms';
import { CreateScopeInput, useCreateScopeMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
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
    defaultValues: AddScopeForm.defaultValues,
    resolver: AddScopeForm.resolver,
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
  const submit = (data: CreateScopeInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer
        title="Add Scope"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/* Name */}
        <FormTextInputs
          label={AddScopeForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddScopeForm.labels.nameSpanish}
          control={control}
          name="nameSpanish"
          required
        />
        {/* Primary Email */}
        <FormTextInputs
          label={AddScopeForm.labels.description}
          control={control}
          name="description"
        />
        {/* Notes */}
        <FormTextArea
          label={AddScopeForm.labels.notes}
          control={control}
          name="notes"
        />
        {/* Form Actions */}
      </FormContainer>
    </Content>
  );
};

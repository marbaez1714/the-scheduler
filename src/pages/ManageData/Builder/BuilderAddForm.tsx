import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddBuilderForm } from 'src/utils/forms';
import { CreateBuilderInput, useCreateBuilderMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInput } from 'src/components/FormTextInput';
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
  /* Callbacks                  */
  /******************************/
  const submit = async (data: CreateBuilderInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content centerHorizontal loading={loading}>
      <FormContainer
        title="Add Builder"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={AddBuilderForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <FormTextInput
          label={AddBuilderForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          required
        />
        {/******************************/}
        {/* Primary Email              */}
        {/******************************/}
        <FormTextInput
          label={AddBuilderForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/******************************/}
        {/* Company                    */}
        {/******************************/}
        <FormAutocomplete
          label={AddBuilderForm.labels.companyId}
          control={control}
          options={companyOptions}
          name="companyId"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={AddBuilderForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

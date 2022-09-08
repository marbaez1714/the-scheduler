import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddReporterForm } from 'src/utils/forms';
import { CreateReporterInput, useCreateReporterMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

export const ReporterAddForm = () => {
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
    defaultValues: AddReporterForm.defaultValues,
    resolver: AddReporterForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateReporterMutation({
    onCompleted: (data) => {
      toast.success(data.createReporter.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: CreateReporterInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer
        title="Add Reporter"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/* Name */}
        <FormTextInputs
          label={AddReporterForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddReporterForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/* Primary Email */}
        <FormTextInputs
          label={AddReporterForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/* Notes */}
        <FormTextArea
          label={AddReporterForm.labels.notes}
          control={control}
          name="notes"
        />
        {/* Form Actions */}
      </FormContainer>
    </Content>
  );
};

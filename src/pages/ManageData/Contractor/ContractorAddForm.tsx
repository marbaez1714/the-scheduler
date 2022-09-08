import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddContractorForm } from 'src/utils/forms';
import { CreateContractorInput, useCreateContractorMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

export const ContractorAddForm = () => {
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
    defaultValues: AddContractorForm.defaultValues,
    resolver: AddContractorForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateContractorMutation({
    onCompleted: (data) => {
      toast.success(data.createContractor.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: CreateContractorInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer
        title="Add Contractor"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/* Name */}
        <FormTextInputs
          label={AddContractorForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddContractorForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/* Notes */}
        <FormTextArea
          label={AddContractorForm.labels.notes}
          control={control}
          name="notes"
        />
        {/* Form Actions */}
      </FormContainer>
    </Content>
  );
};

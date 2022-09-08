import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddSupplierForm } from 'src/utils/forms';
import { CreateSupplierInput, useCreateSupplierMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

export const SupplierAddForm = () => {
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
    defaultValues: AddSupplierForm.defaultValues,
    resolver: AddSupplierForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateSupplierMutation({
    onCompleted: (data) => {
      toast.success(data.createSupplier.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: CreateSupplierInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer
        title="Add Supplier"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/* Name */}
        <FormTextInputs
          label={AddSupplierForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddSupplierForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/* Notes */}
        <FormTextArea
          label={AddSupplierForm.labels.notes}
          control={control}
          name="notes"
        />
        {/* Form Actions */}
      </FormContainer>
    </Content>
  );
};

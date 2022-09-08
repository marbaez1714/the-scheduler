import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddCompanyForm } from 'src/utils/forms';
import { CreateCompanyInput, useCreateCompanyMutation } from 'src/api';
import { Content } from 'src/components/Content';
import { FormTextInputs } from 'src/components/FormTextInput';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';

export const CompanyAddForm = () => {
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
    defaultValues: AddCompanyForm.defaultValues,
    resolver: AddCompanyForm.resolver,
  });

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateCompanyMutation({
    onCompleted: (data) => {
      toast.success(data.createCompany.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: CreateCompanyInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-col items-center" loading={loading}>
      {/* Form */}
      <FormContainer
        title="Add Company"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/* Name */}
        <FormTextInputs
          label={AddCompanyForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
        />
        {/* Primary Email */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/* Primary Address */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryAddress}
          control={control}
          name="primaryAddress"
        />
        {/* Notes */}
        <FormTextArea
          label={AddCompanyForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

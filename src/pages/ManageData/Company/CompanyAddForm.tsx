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
      <FormContainer title="Add Company" onSubmit={handleSubmit(submit)}>
        {/* Name */}
        <FormTextInputs label={AddCompanyForm.labels.name} className="w-96" control={control} name="name" required />
        {/* Primary Phone */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryPhone}
          className="w-96"
          control={control}
          name="primaryPhone"
        />
        {/* Primary Email */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryEmail}
          className="w-96"
          control={control}
          name="primaryEmail"
        />
        {/* Primary Address */}
        <FormTextInputs
          label={AddCompanyForm.labels.primaryAddress}
          className="w-96"
          control={control}
          name="primaryAddress"
        />
        {/* Notes */}
        <FormTextArea label={AddCompanyForm.labels.notes} className="w-96" control={control} name="notes" />

        {/* Form Actions */}
        <div className="flex justify-end pt-6 space-x-4">
          <Button onClick={() => reset()}>Clear</Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </FormContainer>
    </Content>
  );
};

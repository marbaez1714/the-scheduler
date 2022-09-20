import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteCompanyForm } from 'src/utils/forms';
import { WriteCompanyInput, useCreateCompanyMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';


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
    defaultValues: WriteCompanyForm.defaultValues,
    resolver: WriteCompanyForm.resolver,
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
  const submit = (data: WriteCompanyInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Company"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput
          label={WriteCompanyForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <Form.TextInput
          label={WriteCompanyForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
        />
        {/******************************/}
        {/* Primary Email              */}
        {/******************************/}
        <Form.TextInput
          label={WriteCompanyForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/******************************/}
        {/* Primary Address            */}
        {/******************************/}
        <Form.TextInput
          label={WriteCompanyForm.labels.primaryAddress}
          control={control}
          name="primaryAddress"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextArea
          label={WriteCompanyForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

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
        onClearClick={() => reset()}
        isValid={isValid}
      >
        <div className="grid grid-cols-2 gap-4">
          {/******************************/}
          {/* Name                       */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.name}
              control={control}
              name="name"
              required
            />
          </div>
          {/******************************/}
          {/* Primary Phone              */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
            />
          </div>
          {/******************************/}
          {/* Primary Email              */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.primaryEmail}
              control={control}
              name="primaryEmail"
            />
          </div>
          {/******************************/}
          {/* Primary Address            */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.primaryAddress}
              control={control}
              name="primaryAddress"
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteCompanyForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

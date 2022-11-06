import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteContractorForm } from 'src/utils/forms';
import { WriteContractorInput, useCreateContractorMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

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
    defaultValues: WriteContractorForm.defaultValues,
    resolver: WriteContractorForm.resolver,
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
  const submit = (data: WriteContractorInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Contractor"
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
              label={WriteContractorForm.labels.name}
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
              label={WriteContractorForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
              required
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteContractorForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

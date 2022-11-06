import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteSupplierForm } from 'src/utils/forms';
import { WriteSupplierInput, useCreateSupplierMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

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
    defaultValues: WriteSupplierForm.defaultValues,
    resolver: WriteSupplierForm.resolver,
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
  const submit = (data: WriteSupplierInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Supplier"
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
              label={WriteSupplierForm.labels.name}
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
              label={WriteSupplierForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteSupplierForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

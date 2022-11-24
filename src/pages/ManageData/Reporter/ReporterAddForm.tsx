import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteReporterForm } from 'src/utils/forms';
import { WriteReporterInput, useCreateReporterMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

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
    defaultValues: WriteReporterForm.defaultValues,
    resolver: WriteReporterForm.resolver,
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
  const submit = (data: WriteReporterInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content loading={loading}>
      <Form
        title="Add Reporter"
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
              label={WriteReporterForm.labels.name}
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
              label={WriteReporterForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
              required
            />
          </div>
          {/******************************/}
          {/* Primary Email              */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteReporterForm.labels.primaryEmail}
              control={control}
              name="primaryEmail"
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteReporterForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

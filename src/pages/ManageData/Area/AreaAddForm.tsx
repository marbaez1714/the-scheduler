import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteAreaForm } from 'src/utils/forms';
import { WriteAreaInput, useCreateAreaMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form as FormComponent } from 'src/components/Form';

export const AreaAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<WriteAreaInput>({
    mode: 'all',
    defaultValues: WriteAreaForm.defaultValues,
    resolver: WriteAreaForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateAreaMutation({
    onCompleted: (data) => {
      toast.success(data.createArea.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = async (data: WriteAreaInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content loading={loading}>
      <FormComponent
        title="Add Area"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
        onClearClick={() => reset()}
      >
        <div className="grid grid-cols-2 gap-4">
          {/******************************/}
          {/* Name                       */}
          {/******************************/}
          <div className="col-span-1">
            <FormComponent.TextInput
              label="Name"
              control={control}
              name="name"
              required
            />
          </div>
          <div className="col-span-1">
            {/******************************/}
            {/* Name - Spanish             */}
            {/******************************/}
            <FormComponent.TextInput
              label="Name Translation (Spanish)"
              control={control}
              name="nameSpanish"
              required
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <FormComponent.TextAreaInput
              label="Notes"
              control={control}
              name="notes"
            />
          </div>
        </div>
      </FormComponent>
    </Screen.Content>
  );
};

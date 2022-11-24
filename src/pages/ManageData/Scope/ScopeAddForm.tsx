import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteScopeForm } from 'src/utils/forms';
import { WriteScopeInput, useCreateScopeMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';

export const ScopeAddForm = () => {
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
    defaultValues: WriteScopeForm.defaultValues,
    resolver: WriteScopeForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateScopeMutation({
    onCompleted: (data) => {
      toast.success(data.createScope.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = (data: WriteScopeInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content loading={loading}>
      <Form
        title="Add Scope"
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
              label={WriteScopeForm.labels.name}
              control={control}
              name="name"
              required
            />
          </div>
          {/******************************/}
          {/* Name - Spanish             */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteScopeForm.labels.nameSpanish}
              control={control}
              name="nameSpanish"
              required
            />
          </div>
          {/******************************/}
          {/* Description                */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteScopeForm.labels.description}
              control={control}
              name="description"
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteScopeForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

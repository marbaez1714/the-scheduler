import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteBuilderForm } from 'src/utils/forms';
import { WriteBuilderInput, useCreateBuilderMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { useOptions } from 'src/hooks/useOptions';

export const BuilderAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { companyOptions } = useOptions();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteBuilderForm.defaultValues,
    resolver: WriteBuilderForm.resolver,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateBuilderMutation({
    onCompleted: (data) => {
      toast.success(data.createBuilder.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const submit = async (data: WriteBuilderInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Builder"
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
              label={WriteBuilderForm.labels.name}
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
              label={WriteBuilderForm.labels.primaryPhone}
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
              label={WriteBuilderForm.labels.primaryEmail}
              control={control}
              name="primaryEmail"
            />
          </div>
          {/******************************/}
          {/* Company                    */}
          {/******************************/}
          <div className="col-span-1">
            <Form.AutocompleteInput
              label={WriteBuilderForm.labels.companyId}
              control={control}
              options={companyOptions}
              name="companyId"
              required
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteBuilderForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

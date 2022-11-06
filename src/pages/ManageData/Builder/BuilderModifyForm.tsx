import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetBuilderQuery,
  useModifyBuilderMutation,
  WriteBuilderInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { useOptions } from 'src/hooks/useOptions';
import { WriteBuilderForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const BuilderModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { builderId } = useParams();
  const navigate = useNavigate();
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
  const { loading: getLoading } = useGetBuilderQuery({
    skip: !builderId,
    variables: { id: builderId ?? '' },
    onCompleted: ({ builderById }) => {
      if (!builderById) {
        throw new Error();
      }

      reset({
        name: builderById.name,
        companyId: builderById.companyId,
        primaryPhone: builderById.primaryPhone ?? '',
        primaryEmail: builderById.primaryEmail ?? '',
        notes: builderById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyBuilderMutation({
    onCompleted: (data) => {
      toast.success(data.modifyBuilder.message);
      navigate(-1);
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
  const submit = (data: WriteBuilderInput) => {
    if (builderId) {
      modify({ variables: { id: builderId, data: data } });
    }
  };
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <Form
        title="Modify Builder"
        onSubmit={handleSubmit(submit)}
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

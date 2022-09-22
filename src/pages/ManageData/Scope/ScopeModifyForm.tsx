import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetScopeQuery,
  useModifyScopeMutation,
  WriteScopeInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { WriteScopeForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const ScopeModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { scopeId } = useParams();
  const navigate = useNavigate();
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
  const { loading: getLoading } = useGetScopeQuery({
    skip: !scopeId,
    variables: { id: scopeId ?? '' },
    onCompleted: ({ scopeById }) => {
      if (!scopeById) {
        throw new Error();
      }

      reset({
        name: scopeById.name,
        nameSpanish: scopeById.nameSpanish,
        description: scopeById.description ?? '',
        notes: scopeById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyScopeMutation({
    onCompleted: (data) => {
      toast.success(data.modifyScope.message);
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
  const submit = (data: WriteScopeInput) => {
    if (scopeId) {
      modify({ variables: { id: scopeId, data: data } });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <Form
        title="Modify Scope"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.nameSpanish}
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Description                */}
        {/******************************/}
        <Form.TextInput
          label={WriteScopeForm.labels.description}
          control={control}
          name="description"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextAreaInput
          label={WriteScopeForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

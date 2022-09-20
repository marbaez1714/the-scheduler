import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetScopeQuery,
  useModifyScopeMutation,
  WriteScopeInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
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
    <Content
      className="flex flex-col items-center"
      loading={getLoading || modifyLoading}
    >
      <FormContainer
        title="Modify Scope"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.nameSpanish}
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Description                */}
        {/******************************/}
        <FormTextInput
          label={WriteScopeForm.labels.description}
          control={control}
          name="description"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteScopeForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

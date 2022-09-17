import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetAreaQuery,
  useModifyAreaMutation,
  WriteAreaInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
import { WriteAreaForm } from 'src/utils/forms';

export const AreaModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { areaId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteAreaForm.defaultValues,
    resolver: WriteAreaForm.resolver,
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
  const { loading: getLoading } = useGetAreaQuery({
    skip: !areaId,
    variables: { id: areaId ?? '' },
    onCompleted: ({ areaById }) => {
      if (areaById) {
        reset({
          name: areaById.name,
          nameSpanish: areaById.nameSpanish,
          notes: areaById.notes ?? '',
        });
      }
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyAreaMutation({
    onCompleted: (data) => {
      toast.success(data.modifyArea.message);
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
  const submit = (data: WriteAreaInput) => {
    if (areaId) {
      modify({ variables: { id: areaId, data: data } });
    }
  };
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content centerHorizontal loading={getLoading || modifyLoading}>
      <FormContainer
        title="Modify Area"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
        onClearClick={reset}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput label="Name" control={control} name="name" required />
        {/******************************/}
        {/* Name - Spanish             */}
        {/******************************/}
        <FormTextInput
          label="Name Translation (Spanish)"
          control={control}
          name="nameSpanish"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea label="Notes" control={control} name="notes" />
      </FormContainer>
    </Content>
  );
};

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useGetAreaQuery } from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';

export const AreaModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { areaId } = useParams();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
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
  const { data: getAreaData, loading: getAreaLoading } = useGetAreaQuery({
    skip: !areaId,
    variables: { id: areaId ?? '' },
    onCompleted: ({ areaById }) => {
      if (!areaById) {
        throw new Error();
      }

      reset({
        name: areaById.name,
        nameSpanish: areaById.nameSpanish,
        notes: areaById.notes ?? '',
      });
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
  const submit = () => {};
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content centerHorizontal loading={getAreaLoading}>
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

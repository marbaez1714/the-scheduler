import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetBuilderQuery,
  useModifyBuilderMutation,
  WriteBuilderInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
import { useOptions } from 'src/hooks/useOptions';
import { WriteBuilderForm } from 'src/utils/forms';

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
      if (builderById) {
        reset({
          name: builderById.name,
          companyId: builderById.companyId,
          primaryPhone: builderById.primaryPhone ?? '',
          primaryEmail: builderById.primaryEmail ?? '',
          notes: builderById.notes ?? '',
        });
      }
    },
    onError: () => {
      toast.error('Something went wrong');
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
      console.log(data.primaryPhone);
      modify({ variables: { id: builderId, data: data } });
    }
  };
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content centerHorizontal loading={getLoading || modifyLoading}>
      <FormContainer
        title="Add Builder"
        onSubmit={handleSubmit(submit)}
        onClearClick={reset}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteBuilderForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <FormTextInput
          label={WriteBuilderForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/******************************/}
        {/* Primary Email              */}
        {/******************************/}
        <FormTextInput
          label={WriteBuilderForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/******************************/}
        {/* Company                    */}
        {/******************************/}
        <FormAutocomplete
          label={WriteBuilderForm.labels.companyId}
          control={control}
          options={companyOptions}
          name="companyId"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteBuilderForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

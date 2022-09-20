import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetCommunityQuery,
  useModifyCommunityMutation,
  WriteCommunityInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
import { useOptions } from 'src/hooks/useOptions';
import { WriteCommunityForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const CommunityModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { companyOptions } = useOptions();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteCommunityForm.defaultValues,
    resolver: WriteCommunityForm.resolver,
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
  const { loading: getLoading } = useGetCommunityQuery({
    skip: !communityId,
    variables: { id: communityId ?? '' },
    onCompleted: ({ communityById }) => {
      if (!communityById) {
        throw new Error();
      }

      reset({
        name: communityById.name,
        companyId: communityById.companyId,
        notes: communityById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyCommunityMutation({
    onCompleted: (data) => {
      toast.success(data.modifyCommunity.message);
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
  const submit = (data: WriteCommunityInput) => {
    if (communityId) {
      modify({ variables: { id: communityId, data: data } });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <FormContainer
        title="Modify Community"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteCommunityForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Company                    */}
        {/******************************/}
        <FormAutocomplete
          label={WriteCommunityForm.labels.companyId}
          control={control}
          options={companyOptions}
          name="companyId"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteCommunityForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Screen.Content>
  );
};

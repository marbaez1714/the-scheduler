import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetCommunityQuery,
  useModifyCommunityMutation,
  WriteCommunityInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
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
    <Screen.Content loading={getLoading || modifyLoading}>
      <Form
        title="Modify Community"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        <div className="grid grid-cols-2 gap-4">
          {/******************************/}
          {/* Name                       */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCommunityForm.labels.name}
              control={control}
              name="name"
              required
            />
          </div>
          {/******************************/}
          {/* Company                    */}
          {/******************************/}
          <div className="col-span-1">
            <Form.AutocompleteInput
              label={WriteCommunityForm.labels.companyId}
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
              label={WriteCommunityForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

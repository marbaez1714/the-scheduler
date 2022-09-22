import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { WriteCommunityForm } from 'src/utils/forms';
import { WriteCommunityInput, useCreateCommunityMutation } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { useOptions } from 'src/hooks/useOptions';

export const CommunityAddForm = () => {
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
  const [create, { loading }] = useCreateCommunityMutation({
    onCompleted: (data) => {
      toast.success(data.createCommunity.message);
      reset();
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
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={loading}>
      <Form
        title="Add Community"
        onSubmit={handleSubmit(submit)}
        onClearClick={() => reset()}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput
          label={WriteCommunityForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Company                    */}
        {/******************************/}
        <Form.AutocompleteInput
          label={WriteCommunityForm.labels.companyId}
          control={control}
          options={companyOptions}
          name="companyId"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextAreaInput
          label={WriteCommunityForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetReporterQuery,
  useModifyReporterMutation,
  WriteReporterInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { WriteReporterForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const ReporterModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { reporterId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteReporterForm.defaultValues,
    resolver: WriteReporterForm.resolver,
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
  const { loading: getLoading } = useGetReporterQuery({
    skip: !reporterId,
    variables: { id: reporterId ?? '' },
    onCompleted: ({ reporterById }) => {
      if (!reporterById) {
        throw new Error();
      }
      reset({
        name: reporterById.name,
        primaryPhone: reporterById.primaryPhone,
        primaryEmail: reporterById.primaryEmail ?? '',
        notes: reporterById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyReporterMutation({
    onCompleted: (data) => {
      toast.success(data.modifyReporter.message);
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
  const submit = (data: WriteReporterInput) => {
    if (reporterId) {
      modify({ variables: { id: reporterId, data: data } });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <Form
        title="Modify Reporter"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput
          label={WriteReporterForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <Form.TextInput
          label={WriteReporterForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/******************************/}
        {/* Primary Email              */}
        {/******************************/}
        <Form.TextInput
          label={WriteReporterForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextArea
          label={WriteReporterForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

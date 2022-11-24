import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetContractorQuery,
  useModifyContractorMutation,
  WriteContractorInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
import { WriteContractorForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const ContractorModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { contractorId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteContractorForm.defaultValues,
    resolver: WriteContractorForm.resolver,
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
  const { loading: getLoading } = useGetContractorQuery({
    skip: !contractorId,
    variables: { id: contractorId ?? '' },
    onCompleted: ({ contractorById }) => {
      if (!contractorById) {
        throw new Error();
      }

      reset({
        name: contractorById.name,
        primaryPhone: contractorById.primaryPhone,
        notes: contractorById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyContractorMutation({
    onCompleted: (data) => {
      toast.success(data.modifyContractor.message);
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
  const submit = (data: WriteContractorInput) => {
    if (contractorId) {
      modify({ variables: { id: contractorId, data: data } });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content loading={getLoading || modifyLoading}>
      <Form
        title="Modify Contractor"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        <div className="grid grid-cols-2 gap-4">
          {/******************************/}
          {/* Name                       */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteContractorForm.labels.name}
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
              label={WriteContractorForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
              required
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteContractorForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

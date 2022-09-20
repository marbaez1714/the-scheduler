import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetContractorQuery,
  useModifyContractorMutation,
  WriteContractorInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
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
    <Content
      className="flex flex-col items-center"
      loading={getLoading || modifyLoading}
    >
      <FormContainer
        title="Modify Contractor"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteContractorForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <FormTextInput
          label={WriteContractorForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
          required
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteContractorForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

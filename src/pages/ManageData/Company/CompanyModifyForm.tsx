import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetCompanyQuery,
  useModifyCompanyMutation,
  WriteCompanyInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
import { WriteCompanyForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const CompanyModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteCompanyForm.defaultValues,
    resolver: WriteCompanyForm.resolver,
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
  const { loading: getLoading } = useGetCompanyQuery({
    skip: !companyId,
    variables: { id: companyId ?? '' },
    onCompleted: ({ companyById }) => {
      if (!companyById) {
        throw new Error();
      }

      reset({
        name: companyById.name,
        primaryPhone: companyById.primaryPhone ?? '',
        primaryEmail: companyById.primaryEmail ?? '',
        primaryAddress: companyById.primaryAddress ?? '',
        notes: companyById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifyCompanyMutation({
    onCompleted: (data) => {
      toast.success(data.modifyCompany.message);
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
  const submit = (data: WriteCompanyInput) => {
    if (companyId) {
      modify({ variables: { id: companyId, data: data } });
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
        title="Modify Company"
        onSubmit={handleSubmit(submit)}
        
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteCompanyForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <FormTextInput
          label={WriteCompanyForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
        />
        {/******************************/}
        {/* Primary Email              */}
        {/******************************/}
        <FormTextInput
          label={WriteCompanyForm.labels.primaryEmail}
          control={control}
          name="primaryEmail"
        />
        {/******************************/}
        {/* Primary Address            */}
        {/******************************/}
        <FormTextInput
          label={WriteCompanyForm.labels.primaryAddress}
          control={control}
          name="primaryAddress"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteCompanyForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

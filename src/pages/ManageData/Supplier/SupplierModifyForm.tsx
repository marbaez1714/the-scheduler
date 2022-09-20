import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetSupplierQuery,
  useModifySupplierMutation,
  WriteSupplierInput,
} from 'src/api';
import { Content } from 'src/components/Content';
import { FormContainer } from 'src/components/FormContainer';
import { FormTextArea } from 'src/components/FormTextArea';
import { FormTextInput } from 'src/components/FormTextInput';
import { WriteSupplierForm } from 'src/utils/forms';
import { ToastMessages } from 'src/utils/toastMessages';

export const SupplierModifyForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: WriteSupplierForm.defaultValues,
    resolver: WriteSupplierForm.resolver,
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
  const { loading: getLoading } = useGetSupplierQuery({
    skip: !supplierId,
    variables: { id: supplierId ?? '' },
    onCompleted: ({ supplierById }) => {
      if (!supplierById) {
        throw new Error();
      }

      reset({
        name: supplierById.name,
        primaryPhone: supplierById.primaryPhone ?? '',
        notes: supplierById.notes ?? '',
      });
    },
    onError: () => {
      ToastMessages.somethingWrong();
    },
  });

  const [modify, { loading: modifyLoading }] = useModifySupplierMutation({
    onCompleted: (data) => {
      toast.success(data.modifySupplier.message);
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
  const submit = (data: WriteSupplierInput) => {
    if (supplierId) {
      modify({ variables: { id: supplierId, data: data } });
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
        title="Modify Supplier"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <FormTextInput
          label={WriteSupplierForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <FormTextInput
          label={WriteSupplierForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <FormTextArea
          label={WriteSupplierForm.labels.notes}
          control={control}
          name="notes"
        />
      </FormContainer>
    </Content>
  );
};

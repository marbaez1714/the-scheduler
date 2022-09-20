import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetSupplierQuery,
  useModifySupplierMutation,
  WriteSupplierInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
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
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <Form
        title="Modify Supplier"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        {/******************************/}
        {/* Name                       */}
        {/******************************/}
        <Form.TextInput
          label={WriteSupplierForm.labels.name}
          control={control}
          name="name"
          required
        />
        {/******************************/}
        {/* Primary Phone              */}
        {/******************************/}
        <Form.TextInput
          label={WriteSupplierForm.labels.primaryPhone}
          control={control}
          name="primaryPhone"
          mask="phone"
        />
        {/******************************/}
        {/* Notes                      */}
        {/******************************/}
        <Form.TextArea
          label={WriteSupplierForm.labels.notes}
          control={control}
          name="notes"
        />
      </Form>
    </Screen.Content>
  );
};

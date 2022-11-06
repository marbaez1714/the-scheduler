import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetCompanyQuery,
  useModifyCompanyMutation,
  WriteCompanyInput,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { Form } from 'src/components/Form';
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
    <Screen.Content centerHorizontal loading={getLoading || modifyLoading}>
      <Form
        title="Modify Company"
        onSubmit={handleSubmit(submit)}
        isValid={isValid}
      >
        <div className="grid grid-cols-2 gap-4">
          {/******************************/}
          {/* Name                       */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.name}
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
              label={WriteCompanyForm.labels.primaryPhone}
              control={control}
              name="primaryPhone"
              mask="phone"
            />
          </div>
          {/******************************/}
          {/* Primary Email              */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.primaryEmail}
              control={control}
              name="primaryEmail"
            />
          </div>
          {/******************************/}
          {/* Primary Address            */}
          {/******************************/}
          <div className="col-span-1">
            <Form.TextInput
              label={WriteCompanyForm.labels.primaryAddress}
              control={control}
              name="primaryAddress"
            />
          </div>
          {/******************************/}
          {/* Notes                      */}
          {/******************************/}
          <div className="col-span-2">
            <Form.TextAreaInput
              label={WriteCompanyForm.labels.notes}
              control={control}
              name="notes"
            />
          </div>
        </div>
      </Form>
    </Screen.Content>
  );
};

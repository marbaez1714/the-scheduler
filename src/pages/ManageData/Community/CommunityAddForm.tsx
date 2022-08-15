import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateCommunityInput, useCreateCommunityMutation } from 'src/api';
import { Content, FormAutocomplete, FormTextField } from 'src/components';
import { useOptions } from 'src/hooks/useOptions';
import { AddFormDefaultData, formRules } from 'src/utils/forms';

export const CommunityAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();
  const { companyOptions } = useOptions();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.community,
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
  const handleBack = () => {
    navigate(-1);
  };

  const submit = (data: CreateCommunityInput) => {
    create({ variables: { data } });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loading}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form className="form-card grid-cols-2" onSubmit={handleSubmit(submit)}>
        {/* Title */}
        <h1 className="form-title">Add a Community</h1>

        {/* Company REQUIRED */}
        <FormAutocomplete
          label="Company"
          control={control}
          name="companyId"
          rules={formRules.requiredNonEmptyString}
          options={companyOptions}
        />

        {/* Name REQUIRED */}
        <FormTextField label="Name" control={control} name="name" rules={formRules.requiredNonEmptyString} />

        {/* Notes */}
        <FormTextField className="col-span-2" label="Notes" name="notes" control={control} multiline />

        {/* Actions */}
        <div className="col-span-2 space-x-2 text-right">
          <Button onClick={() => reset()}>Clear</Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Content>
  );
};

import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateBuilderInput, useCreateBuilderMutation } from 'src/api';
import { Content, FormAutocomplete, FormTextField } from 'src/components';
import { useOptions } from 'src/hooks/useOptions';
import { AddFormDefaultData, formRules } from 'src/utils/forms';

export const BuilderAddForm = () => {
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
    defaultValues: AddFormDefaultData.builder,
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
  const [create, { loading }] = useCreateBuilderMutation({
    onCompleted: (data) => {
      toast.success(data.createBuilder.message);
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

  const submit = async (data: CreateBuilderInput) => {
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
        <h1 className="form-title">Add a Builder</h1>

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

        {/* Phone Number REQUIRED */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />

        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />

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

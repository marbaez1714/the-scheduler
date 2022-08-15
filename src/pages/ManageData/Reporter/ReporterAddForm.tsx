import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateReporterInput, useCreateReporterMutation } from 'src/api';
import { Content, FormTextField } from 'src/components';
import { AddFormDefaultData, formRules } from 'src/utils/forms';

export const ReporterAddForm = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: AddFormDefaultData.reporter,
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
  const [create, { loading }] = useCreateReporterMutation({
    onCompleted: (data) => {
      toast.success(data.createReporter.message);
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

  const submit = (data: CreateReporterInput) => {
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
        <h1 className="form-title">Add a Reporter</h1>
        {/* Name REQUIRED */}
        <FormTextField label="Reporter Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Email */}
        <FormTextField label="Email" name="primaryEmail" control={control} />
        {/* Phone number REQUIRED */}
        <FormTextField
          label="Phone Number"
          name="primaryPhone"
          control={control}
          rules={formRules.requiredNonEmptyString}
        />
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

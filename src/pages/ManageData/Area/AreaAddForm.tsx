import { useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { ArrowBack } from '@mui/icons-material';

import { Content, FormTextField } from 'src/components';
import { AddFormDefaultData, formRules } from 'src/utils/forms';
import { CreateAreaInput, useCreateAreaMutation } from 'src/api';

export const AreaAddForm = () => {
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
    defaultValues: AddFormDefaultData.area,
  });

  /******************************/
  /* Data                       */
  /******************************/
  const [create, { loading }] = useCreateAreaMutation({
    onCompleted: (data) => {
      toast.success(data.createArea.message);
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

  const submit = async (data: CreateAreaInput) => {
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
        <h1 className="form-title">Add an Area</h1>
        {/* Name REQUIRED */}
        <FormTextField label="Area Name" name="name" control={control} rules={formRules.requiredNonEmptyString} />
        {/* Name in Spanish REQUIRED */}
        <FormTextField
          label="Translation"
          name="nameSpanish"
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

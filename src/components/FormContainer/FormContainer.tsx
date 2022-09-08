import { Button } from '@mui/material';
import { FormContainerProps } from './types';

const FormContainer = ({
  title,
  isValid,
  onSubmit,
  onClearClick,
  children,
}: FormContainerProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

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

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="shadow">
      <div className="border-b border-b-slate-500 bg-slate-600 px-6 py-4">
        <h1 className="text-white text-4xl tracking-wide font-semibold">
          {title}
        </h1>
        <p className="text-white opacity-70">
          Fields marked with <span className="text-red-500 font-bold">*</span>{' '}
          are required.
        </p>
      </div>

      <form className="bg-slate-100 p-6 space-y-4 w-96" onSubmit={onSubmit}>
        {children}

        <div className="flex justify-end pt-6 space-x-4">
          <Button onClick={onClearClick}>Clear</Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;

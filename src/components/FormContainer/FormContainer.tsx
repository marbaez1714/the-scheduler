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
      <div className="px-6 py-4 border-b border-b-slate-500 bg-slate-600">
        <h1 className="text-4xl font-semibold tracking-wide text-white">
          {title}
        </h1>
        <p className="text-white opacity-70">
          Fields marked with <span className="font-bold text-red-500">*</span>{' '}
          are required.
        </p>
      </div>

      <form className="p-6 space-y-4 bg-slate-100 w-96" onSubmit={onSubmit}>
        {children}

        <div className="flex justify-end pt-6 space-x-4">
          {!!onClearClick && <Button onClick={onClearClick}>Clear</Button>}
          <Button variant="contained" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;

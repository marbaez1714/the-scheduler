import { Button } from 'src/components/Button';
import { Autocomplete } from './Inputs/Autocomplete';
import { TextArea } from './Inputs/TextArea';
import { TextInput } from './Inputs/TextInput';
import { FormProps } from './types';

const Form = ({
  title,
  isValid,
  onSubmit,
  onClearClick,
  children,
}: FormProps) => {
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
      <div className="px-6 py-4 border-b border-app-dark bg-app text-app-altText">
        <h1 className="text-4xl font-semibold tracking-wide ">{title}</h1>
        <p className="text-app-altText/50">
          Fields marked with <span className="font-bold text-app-error">*</span>{' '}
          are required.
        </p>
      </div>

      <form className="p-6 space-y-4 bg-app-light w-96" onSubmit={onSubmit}>
        {children}

        <div className="flex justify-end pt-6 space-x-4">
          {!!onClearClick && (
            <Button variant="text" onClick={onClearClick} title="Clear" />
          )}

          <Button type="submit" disabled={!isValid} title="Submit" />
        </div>
      </form>
    </div>
  );
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.Autocomplete = Autocomplete;

export default Form;

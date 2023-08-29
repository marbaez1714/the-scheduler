import cn from 'classnames';

import { Button } from 'src/components/Button';
import { FormTextInput } from './FormTextInput';
import { FormTextAreaInput } from './FormTextAreaInput';
import { FormAutoCompleteInput } from './FormAutoCompleteInput';
import { FormDateInput } from './FormDateInput';
import { FormProps } from './types';
import { FormLineItemInput } from './FormLineItemInput';
import { FormModifyLineItemInput } from './FormModifyLineItemInput';

const Form = ({
  title,
  isValid,
  onSubmit,
  onClearClick,
  className,
  children,
}: FormProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className={cn('w-full overflow-hidden rounded shadow', className)}>
      <div className="border-b border-app-dark bg-app px-6 py-4 text-app-altText">
        <h1 className="text-4xl font-semibold tracking-wide">{title}</h1>
        <p className="text-app-altText/50">
          Fields marked with <span className="font-bold text-app-error">*</span>{' '}
          are required.
        </p>
      </div>

      <form className="bg-app-light p-6" onSubmit={onSubmit}>
        {children}

        <div className="form-divider-y my-6 h-0.5 w-full" />

        <div className="flex justify-end space-x-4">
          {!!onClearClick && (
            <Button variant="text" onClick={onClearClick}>
              Clear
            </Button>
          )}

          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

Form.TextInput = FormTextInput;
Form.TextAreaInput = FormTextAreaInput;
Form.AutocompleteInput = FormAutoCompleteInput;
Form.DateInput = FormDateInput;
Form.LineItemInput = FormLineItemInput;
Form.ModifyLineItemInput = FormModifyLineItemInput;

export default Form;

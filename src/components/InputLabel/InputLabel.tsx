import cn from 'classnames';
import { InputLabelProps } from './types';

//#region - Component

export const InputLabel = ({
  children,
  required,
  className,
  ...rest
}: InputLabelProps) => {
  //#region - Render

  return (
    <label
      className={cn('mb-1 block font-medium text-app-dark', className)}
      {...rest}
    >
      {children}
      {required && <span className="ml-1 font-bold text-app-error">*</span>}
    </label>
  );

  //#endregion
};

//#endregion

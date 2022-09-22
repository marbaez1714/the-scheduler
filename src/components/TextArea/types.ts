import { HTMLProps } from 'react';

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  errorMessage?: string;
}

import { HTMLProps } from 'react';

export interface TextAreaInputProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  errorMessage?: string;
}

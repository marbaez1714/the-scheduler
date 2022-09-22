import { HTMLProps } from 'react';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  required?: boolean;
  mask?: 'phone';
  errorMessage?: string;
}

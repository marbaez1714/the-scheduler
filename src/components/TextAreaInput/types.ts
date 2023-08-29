import { InputHTMLAttributes } from 'react';

import { InputProps } from '../types';

export type TextAreaInputProps = InputHTMLAttributes<HTMLTextAreaElement> &
  InputProps;

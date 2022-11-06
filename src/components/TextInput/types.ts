import { InputHTMLAttributes } from 'react';

import { InputProps } from '../types';

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  mask?: 'phone';
  icon?: React.ReactNode;
}

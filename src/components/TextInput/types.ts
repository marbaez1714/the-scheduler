import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  mask?: 'phone';
  icon?: IconProps['icon'];
}

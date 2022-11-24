import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';

import { InputProps } from '../types';

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  mask?: 'phone';
  icon?: IconProps['icon'];
}

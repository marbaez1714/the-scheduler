import { HTMLProps } from 'react';

import { InputProps } from '../types';

export interface TextInputProps
  extends HTMLProps<HTMLInputElement>,
    InputProps {
  mask?: 'phone';
}

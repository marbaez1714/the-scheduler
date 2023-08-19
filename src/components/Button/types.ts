import { ButtonHTMLAttributes } from 'react';
import { IconName } from '../Icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  variant?: 'text' | 'text-light' | 'filled' | 'filled-light' | 'outline';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  loading?: boolean;
}

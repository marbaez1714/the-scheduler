import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  children?: React.ReactNode;
  leftRender?: React.ReactNode;
  rightRender?: React.ReactNode;
  variant?: 'text' | 'text-light' | 'filled' | 'filled-light' | 'outline';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  loading?: boolean;
}

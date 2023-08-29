import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'filled' | 'outline';
}

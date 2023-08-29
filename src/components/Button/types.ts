import { IconName } from '../Icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  variant?: 'text' | 'text-light' | 'filled' | 'filled-light' | 'outline';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  loading?: boolean;
}

import { IconName } from '../Icon';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName;
  variant?: 'text' | 'filled' | 'outline';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  loading?: boolean;
}

import { iconMap } from './utils';

export interface IconProps {
  className?: string;
  icon: keyof typeof iconMap;
}

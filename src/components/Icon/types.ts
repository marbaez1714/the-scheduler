import { iconMap } from './utils';

export type IconName = keyof typeof iconMap;

export interface IconProps {
  className?: string;
  icon: IconName;
}

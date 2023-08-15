import { iconMap } from './utils';
import { IconProps } from './types';

//#region Component

export const Icon = ({ icon, className }: IconProps) => {
  //#region Constants

  const IconComponent = iconMap[icon];

  //#endregion
  //#region Render

  return <IconComponent className={className} />;

  //#endregion
};

//#endregion

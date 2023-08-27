import { iconMap } from './utils';
import { IconProps } from './types';
import { useMemo } from 'react';

//#region - Component

export const Icon = ({ icon, className }: IconProps) => {
  //#region - Constants

  const IconComponent = useMemo(() => iconMap[icon], [icon]);

  //#endregion
  //#region - Render

  return <IconComponent className={className} />;

  //#endregion
};

//#endregion

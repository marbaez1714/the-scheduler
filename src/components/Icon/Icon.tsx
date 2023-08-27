import { useMemo } from 'react';
import cn from 'classnames';
import { iconMap } from './utils';
import { IconProps } from './types';

//#region - Component

export const Icon = ({ icon, className }: IconProps) => {
  //#region - Constants

  const IconComponent = useMemo(() => iconMap[icon], [icon]);

  //#endregion
  //#region - Render

  return <IconComponent className={cn('aspect-square', className)} />;

  //#endregion
};

//#endregion

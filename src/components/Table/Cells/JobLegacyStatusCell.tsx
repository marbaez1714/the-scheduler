import cn from 'classnames';
import {
  CalendarIcon,
  ClockIcon,
  CogIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

import { JobLegacyStatus } from 'src/api';

import { JobLegacyStatusProps } from '../types';

export const JobLegacyStatusCell = ({ value }: JobLegacyStatusProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  const renderIcon = () => {
    switch (value) {
      case JobLegacyStatus.InProgress:
        return <CogIcon />;
      case JobLegacyStatus.PastDue:
        return <ExclamationTriangleIcon />;
      case JobLegacyStatus.WillCall:
        return <ClockIcon />;
      default:
        return <CalendarIcon />;
    }
  };

  return (
    <div
      className={cn('mx-auto h-6 w-6', {
        'animate-spin text-app-success': value === JobLegacyStatus.InProgress,
        'text-app-info': value === JobLegacyStatus.Today,
        'text-app-error': value === JobLegacyStatus.PastDue,
        'text-app-warn': value === JobLegacyStatus.WillCall,
        'text-app-dark': value === JobLegacyStatus.Planned,
      })}
    >
      {renderIcon()}
    </div>
  );
};

import { useMemo } from 'react';

import { PhoneNumberCellProps } from '../types';

export const PhoneNumberCell = ({ value }: PhoneNumberCellProps) => {
  /******************************/
  /* Memos                      */
  /******************************/
  const phoneNumber = useMemo(() => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match && `${match[1]}-${match[2]}-${match[3]}`;
  }, []);

  /******************************/
  /* Render                     */
  /******************************/
  if (phoneNumber) {
    return (
      <p className="text-sm" title={phoneNumber}>
        {phoneNumber}
      </p>
    );
  }

  return (
    <>
      <p className="text-xs text-app-error" title={value}>
        {value}
      </p>
      <p className="text-xs text-app-error">Invalid Format</p>
    </>
  );
};

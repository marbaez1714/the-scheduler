import { PhoneNumberCellProps } from './types';

export const PhoneNumberCell = ({ value }: PhoneNumberCellProps) => {
  // - HELPERS - //
  const formatNumber = (value?: PhoneNumberCellProps['value']) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : '-';
  };

  // - JSX - //
  return <span className="text-sm max-w-sm">{formatNumber(value)}</span>;
};

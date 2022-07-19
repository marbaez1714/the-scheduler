import { format } from 'date-fns';

export const formatTimestamp = (value: any, template: string) => {
  const milliseconds = value._seconds * 1000;
  const date = new Date(milliseconds);
  return format(date, template);
};

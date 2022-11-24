export interface CollapsableProps {
  title: string;
  defaultOpen?: boolean;
  subtitle?: string;
  children: React.ReactNode;
  unmount?: boolean;
  loading?: boolean;
}

export interface CollapsableProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  loading?: boolean;
  defaultOpen?: boolean;
  action?: { label: string; onClick: () => void };
  open?: boolean;
}

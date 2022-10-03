export interface CollapsableProps {
  title: string;
  defaultOpen?: boolean;
  subtitle?: string;
  rightRender?: React.ReactNode;
  footerRender?: React.ReactNode;
  children: React.ReactNode;
}

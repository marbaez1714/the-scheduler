export interface MenuProps {
  items: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  title: string;
  anchor: JSX.Element;
  className?: string;
}

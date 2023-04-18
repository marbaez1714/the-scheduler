export interface MenuProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
  title: string;
  anchor: JSX.Element;
  className?: string;
}

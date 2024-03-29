export interface ScreenProps {
  children: React.ReactNode;
}

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  primaryAction?: ContentAction;
  title?: string;
}

export interface NavBarMenuProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  links?: { name: string; to: string }[];
}

type ContentAction = {
  onClick: () => void;
  title: string;
};

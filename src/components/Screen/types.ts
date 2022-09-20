export interface ScreenProps {
  children: React.ReactNode;
}

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
  center?: boolean;
  primaryAction?: ContentAction;
}

type ContentAction = {
  onClick: () => void;
  title: string;
};

export interface SideBarLinkProps {
  title: string;
  to: string;
  expanded: boolean;
  icon?: string;
  className?: string;
}

export interface SideBarButtonProps {
  title: string;
  expanded: boolean;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  onClick: () => void;
}

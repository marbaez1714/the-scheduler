export interface ScreenProps {
  children: React.ReactNode;
}

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

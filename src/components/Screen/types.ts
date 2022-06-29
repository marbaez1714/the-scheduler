export interface ScreenProps {
  title?: string;
  children: React.ReactNode;
}

export interface SideBarLinkProps {
  title: string;
  to: string;
  icon?: string;
  className?: string;
}

export interface SideBarButtonProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  onClick: () => void;
}

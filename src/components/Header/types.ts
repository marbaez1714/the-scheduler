export interface HeaderProps {
  title?: string;
}

export type NavMenuItem = {
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
};

export interface NavMenuProps {
  title: string;
  menuItems: NavMenuItem[];
}

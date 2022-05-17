export interface HeaderProps {
  title?: string;
}

export interface NavMenuProps {
  title: string;
  menuItems: { title: string; icon: JSX.Element; onClick?: () => void }[];
}

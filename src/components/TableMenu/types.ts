type MenuAction = {
  icon: string;
  label: string;
  onClick: () => void;
};

export interface TableMenuCellProps {
  menuActions: MenuAction[];
}

import { HeaderProps } from '../Header';

type BreadCrumb = {
  to: string;
  title: string;
};

export interface ScreenProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerProps?: HeaderProps;
  breadCrumbs?: BreadCrumb[];
}

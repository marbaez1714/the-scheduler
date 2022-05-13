import { HeaderProps } from '../Header';

export interface ScreenProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  headerProps?: HeaderProps;
}

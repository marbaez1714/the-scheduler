import { HeaderProps } from './types';

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="z-10 tracking-wide font-medium text-3xl bg-slate-100 p-4 border-b-slate-200 border-b text-center shadow-md">
      {children}
    </header>
  );
};

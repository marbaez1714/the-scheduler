import { ScreenProps } from './types';
import { StatusBar } from './StatusBar';
import { SideBar } from './SideBar';
import { Header } from './Header';

const Screen = ({ title, children }: ScreenProps) => {
  return (
    <div className="flex flex-col h-screen w-screen font-roboto text-slate-900">
      {/* Page */}
      <div className="flex flex-grow overflow-hidden">
        {/* Side Bar */}
        <SideBar />
        {/* Screen */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Header */}
          <Header>{title}</Header>
          {/* Page */}
          <div className="flex flex-grow items-start justify-stretch bg-slate-300 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Screen;

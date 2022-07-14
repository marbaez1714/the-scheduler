import { ScreenProps } from './types';
import { StatusBar } from './StatusBar';
import { SideBar } from './SideBar';

const Screen = ({ children }: ScreenProps) => {
  return (
    <div className="flex flex-col h-screen w-screen font-roboto text-slate-900">
      {/* Page */}
      <div className="flex flex-grow overflow-hidden">
        {/* Side Bar */}
        <SideBar />
        {/* Screen */}
        <div className="flex flex-grow flex-col items-start bg-slate-300 overflow-hidden">{children}</div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Screen;

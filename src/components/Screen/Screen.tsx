import { ScreenProps } from './types';
import { StatusBar } from './StatusBar';
import { SideBar } from './SideBar';

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
          <header className="z-10 tracking-wide font-medium text-3xl bg-slate-100 p-4 border-b-slate-200 border-b text-center shadow-md">
            {title}
          </header>
          {/* Page */}
          <div className="flex flex-grow items-start justify-stretch bg-neutral-200 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Screen;

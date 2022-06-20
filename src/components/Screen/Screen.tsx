import { ScreenProps } from './types';
import { StatusBar } from './StatusBar';
import { SideBar } from './SideBar';

const Screen = ({ title, children }: ScreenProps) => {
  return (
    <div className="flex flex-col h-screen w-screen font-roboto">
      {/* Page */}
      <div className="flex flex-grow">
        {/* Side Bar */}
        <SideBar />
        {/* Screen */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Header */}
          <header className="font-medium text-3xl text-slate-900 bg-slate-100 p-4 border-b-slate-200 border-b">
            {title}
          </header>
          {/* Page */}
          <div className="flex flex-grow overflow-x-auto overflow-y-auto items-start justify-stretch bg-slate-50 px-8 py-4 shadow-inner">
            {children}
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Screen;

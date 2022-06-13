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
        {/* Page Content */}
        <div className="flex flex-col flex-grow">
          <header className="font-medium text-3xl text-slate-900 bg-slate-100 p-4 border-b-slate-200 border-b">
            {title}
          </header>
          <div className="flex flex-grow bg-slate-50 px-8 py-4">{children}</div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Screen;

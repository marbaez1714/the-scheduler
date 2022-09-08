import { ScreenProps } from './types';
import { SideBar } from './SideBar';
import { useAuth0 } from '@auth0/auth0-react';

const Screen = ({ children }: ScreenProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col h-screen w-screen font-roboto text-slate-900">
      {/* Page */}
      <div className="flex flex-grow overflow-hidden">
        {/* Side Bar */}
        <SideBar />
        {/* Screen */}
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>
      {/* Status Bar */}
      <div className="bg-slate-200 flex py-1 px-2 opacity-50 shadow-md z-10">
        <p className="text-xs text-slate-800 px-4">
          Version: {process.env.REACT_APP_VERSION}
        </p>
        <p className="text-xs text-slate-800 px-4">
          {isAuthenticated ? 'Status: Authorized' : 'Status: Unauthorized'}
        </p>
      </div>
    </div>
  );
};

export default Screen;

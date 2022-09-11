import { ScreenProps } from './types';
import { SideBar } from './SideBar';
import { useAuth0 } from '@auth0/auth0-react';

const Screen = ({ children }: ScreenProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col w-screen h-screen font-roboto text-slate-900">
      {/* Page */}
      <div className="flex flex-grow overflow-hidden">
        {/* Side Bar */}
        <SideBar />
        {/* Screen */}
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>
      {/* Status Bar */}
      <div className="z-10 flex px-2 py-1 shadow-md opacity-50 bg-slate-200">
        <p className="px-4 text-xs text-slate-800">
          Version: {process.env.REACT_APP_VERSION}
        </p>
        <p className="px-4 text-xs text-slate-800">
          {isAuthenticated ? 'Status: Authorized' : 'Status: Unauthorized'}
        </p>
      </div>
    </div>
  );
};

export default Screen;

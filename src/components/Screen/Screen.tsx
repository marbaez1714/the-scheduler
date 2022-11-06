import { useAuth0 } from '@auth0/auth0-react';

import { ScreenProps } from './types';
import { Content } from './Content';
import { NavBar } from './NavBar';

const Screen = ({ children }: ScreenProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { isAuthenticated } = useAuth0();

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col w-screen h-screen font-roboto">
      {/******************************/}
      {/* Page                       */}
      {/******************************/}
      <NavBar />
      <div className="flex flex-grow overflow-auto bg-app-medium">
        {/******************************/}
        {/* Screen Content             */}
        {/******************************/}
        {children}
      </div>
      {/******************************/}
      {/* Status Bar                 */}
      {/******************************/}
      <div className="z-10 flex px-2 py-1 shadow-md opacity-50 bg-app-medium">
        <p className="px-4 text-xs text-app-dark">
          Version: {process.env.REACT_APP_VERSION}
        </p>
        <p className="px-4 text-xs text-app-dark">
          Status: {isAuthenticated ? 'Authorized' : 'Unauthorized'}
        </p>
      </div>
    </div>
  );
};

Screen.Content = Content;

export default Screen;

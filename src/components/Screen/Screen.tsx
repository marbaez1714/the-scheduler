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
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-full px-4 pt-16 pb-10 font-roboto bg-app-medium/50">
        {/******************************/}
        {/* Page                       */}
        {/******************************/}
        {/******************************/}
        {/* Screen Content             */}
        {/******************************/}
        {children}
        {/******************************/}
        {/* Status Bar                 */}
        {/******************************/}
      </div>
      <footer className="fixed bottom-0 flex w-full gap-4 px-2 py-1 text-xs shadow-md bg-app-light">
        <p>Version: {process.env.REACT_APP_VERSION}</p>
        <p>Status: {isAuthenticated ? 'Authorized' : 'Unauthorized'}</p>
      </footer>
    </>
  );
};

Screen.Content = Content;

export default Screen;

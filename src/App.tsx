import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast';

import { FirebaseProvider } from './providers/FirebaseProvider';

import Navigation from './navigation/Navigation';

const auth0Props = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN ?? '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? '',
  redirectUri: window.location.origin,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE ?? '',
};

function App() {
  return (
    <Auth0Provider {...auth0Props}>
      <FirebaseProvider>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Navigation />
            <Toaster />
          </LocalizationProvider>
        </BrowserRouter>
      </FirebaseProvider>
    </Auth0Provider>
  );
}

export default App;

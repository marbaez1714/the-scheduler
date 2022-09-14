import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast';

import Navigation from './navigation/Navigation';

import { ApolloAuthProvider } from './providers/ApolloAuthProvider';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApolloAuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Navigation />
            <Toaster />
          </LocalizationProvider>
        </ApolloAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

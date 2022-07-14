import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Navigation from './navigation/Navigation';
import { ModalProvider } from './providers/ModalProvider';

function App() {
  return (
    <FirebaseProvider>
      <ModalProvider>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Navigation />
            <Toaster />
          </LocalizationProvider>
        </BrowserRouter>
      </ModalProvider>
    </FirebaseProvider>
  );
}

export default App;

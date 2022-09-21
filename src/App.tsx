import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-datepicker/dist/react-datepicker.css';

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navigation from './navigation/Navigation';

import { ApolloAuthProvider } from './providers/ApolloAuthProvider';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApolloAuthProvider>
          <Navigation />
          <Toaster />
        </ApolloAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

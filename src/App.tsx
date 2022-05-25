import Navigation from './navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FirebaseProvider } from './providers/FirebaseProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTO0_CLIENT || ''}
        redirectUri={window.location.origin}
      >
        <FirebaseProvider>
          <Navigation />
        </FirebaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

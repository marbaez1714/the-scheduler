import { BrowserRouter } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import AuthRouteProvider from './providers/AuthRouteProvider/AuthRouteProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <AuthRouteProvider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTO0_CLIENT || ''}
        redirectUri={window.location.origin}
      >
        <Navigation />
      </AuthRouteProvider>
    </BrowserRouter>
  );
}

export default App;

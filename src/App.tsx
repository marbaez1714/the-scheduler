import Navigation from './navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navigation />
        <Toaster />
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;

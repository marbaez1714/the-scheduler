import Navigation from "./navigation/Navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
      clientId={process.env.REACT_APP_AUTO0_CLIENT || ""}
    >
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;

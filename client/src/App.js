import "./App.css";
import AccountProvider from "./Context/AccountProvider";
import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const clientId =
    "323041676463-kj7u1i4o6c9tur8l8dk273fni1ltktg1.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

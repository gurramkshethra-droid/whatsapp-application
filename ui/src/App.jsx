import "./App.css";
import { WhatsAppProvider } from "./WhatsAppContext";
import Layout from "./Layout";

function App() {
  return (
    <WhatsAppProvider>
      <div className="app">
        <Layout />
      </div>
    </WhatsAppProvider>
  );
}

export default App;
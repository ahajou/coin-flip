import "./App.css";
import HomePage from "./HomePage";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HomePage />
    </Web3ReactProvider>
  );
}

export default App;
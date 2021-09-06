import logo from "./logo.svg";
import UserStart from "./pages/UserStart";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserStart />
      </div>
    </BrowserRouter>
  );
}

export default App;

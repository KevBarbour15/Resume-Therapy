import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { UserProvider } from "./context/useUser";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>,

  document.getElementById("root")
);

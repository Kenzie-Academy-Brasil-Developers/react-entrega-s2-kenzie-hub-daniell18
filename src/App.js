import { Route, Switch } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Logon from "./pages/Logon";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/logon">
            <Logon />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;

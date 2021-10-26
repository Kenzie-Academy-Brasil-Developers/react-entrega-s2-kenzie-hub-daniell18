import { useState } from "react";
import { Route, Switch } from "react-router";

import Login from "../pages/Login";
import Logon from "../pages/Logon";
import Register from "../pages/Register";
function Routes() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <>
      <div>
        <Switch>
          <Route exact path="/">
            <Login authorized={authorized} setAuthorized={setAuthorized} />
          </Route>
          <Route exact path="/register">
            <Register authorized={authorized} />
          </Route>
          <Route exact path="/logon">
            <Logon authorized={authorized} setAuthorized={setAuthorized} />
          </Route>
        </Switch>
      </div>
    </>
  );
}
export default Routes;

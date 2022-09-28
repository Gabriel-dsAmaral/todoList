import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/login";
import { Signup } from "../pages/Signup";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
};

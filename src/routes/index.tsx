import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/dashboard";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

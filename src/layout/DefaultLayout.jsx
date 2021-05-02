import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "../routes/routes";

const DefaultLayout = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default DefaultLayout;

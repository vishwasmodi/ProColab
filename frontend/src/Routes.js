import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";

// import all the pages here
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/route' component={Page} /> for all the pages */}
        <Route exact path="" element={<Home />} />
      </Switch>
    </Router>
  );
};

export default Routes;

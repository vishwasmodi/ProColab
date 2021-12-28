import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";

// import all the pages here
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProjectPage from "./pages/AddProjectPage";
import Nav from "./components/Nav";
import ProfilePage from "./pages/ProfilePage";

const Routes = () => {
  return (
    <Router>
      <Nav />

      <Switch>
        {/* <Route exact path='/route' component={Page} /> for all the pages */}
        <Route exact path="" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/addproject" element={<AddProjectPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Switch>
    </Router>
  );
};

export default Routes;

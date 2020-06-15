import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import TestComponent from "./components/layout/TestComponent";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";

import PrivateRoute from "./components/routing/PrivateRoute";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { loadUser } from "./actions/auth";

import setAuthToken from "./utils/setAuthToken";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  // loads once bc of the [] in 2nd param
  useEffect(() => {
    // using store.dispatch will allow us to use 'dispatch' inside of loadUser
    // we use store.dispatch because this is not in the Provider. Does not have access to dispatch without store
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar> </Navbar>
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert></Alert>
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>

              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/test"
                component={TestComponent}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

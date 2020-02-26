import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./view/Login/Login";
import SignUp from "./view/SignUp/SignUp";
import Main from "./view/Main/Main";
import Logout from "./view/Logout/Logout";

class App extends Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {}

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/main" exact component={Main} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
    return <div>{routes}</div>;
  }
}

export default withRouter(App);

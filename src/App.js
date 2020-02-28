import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./view/Login/Login";
import SignUp from "./view/SignUp/SignUp";
import Main from "./view/Main/Main";
import Logout from "./view/Logout/Logout";
import Issues from "./view/Issue/Issue";

class App extends Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {
    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    if (email && token && userId) {
      this.setState({
        isSignedIn: true
      });
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isSignedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/issues" exact component={Issues} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <div>{routes}</div>;
  }
}

export default withRouter(App);

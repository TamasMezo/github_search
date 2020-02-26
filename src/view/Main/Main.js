import React, { Component } from "react";
import Button from "../../components/Button/Button";
import { Redirect } from "react-router-dom";
import "./Main.css";

class Main extends Component {
  state = {
    email: "",
    isLogout: false
  };

  componentDidMount() {
    let email = localStorage.getItem("email");
    this.setState({
      email: email
    });
  }

  signOut = () => {
    this.setState({
      isLogout: true
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  };

  render() {
    const { email, isLogout } = this.state;
    return (
      <div className="container">
        {isLogout === true ? <Redirect to="/logout" /> : null}
        <div className="signoutCont">
          <Button clicked={this.signOut}> Sign Out</Button>
        </div>
        <div className="greeting">
          <span>Welcome, {email}</span>
          <p>Successfull Sign In!</p>
        </div>
      </div>
    );
  }
}

export default Main;

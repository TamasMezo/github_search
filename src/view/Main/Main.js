import React, { Component } from "react";
import Button from "../../components/Button/Button";
import { Redirect } from "react-router-dom";
import "./Main.css";

class Main extends Component {
  state = {
    name: "",
    email: "",
    isLogout: false
  };

  componentDidMount() {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    this.setState({
      name: name,
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
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  };

  render() {
    const { name, isLogout } = this.state;
    return (
      <div className="container">
        {isLogout === true ? <Redirect to="/logout" /> : null}
        <div className="signoutCont">
          <Button clicked={this.signOut}> Sign Out</Button>
        </div>
        <div className="greeting">
          <span>Welcome, {name}</span>
          <p>Successfull Sign In!</p>
        </div>
      </div>
    );
  }
}

export default Main;

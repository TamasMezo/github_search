import React, { Component } from "react";
import Form from "../../components/Form/Form";

import "./Login.css";

class Login extends Component {
  state = {
    form: {
      email: "",
      password: ""
    },
    emailWarning: false,
    passwordWarning: false
  };

  componentDidMount() {}

  handleChange = input => e => {
    let targetValue = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [input]: targetValue
      }
    });
    console.log("state", this.state);
  };

  logIn = () => {
    let form = this.state.form;
    if (form.email.length === 0) {
      this.setState({
        emailWarning: true
      });
    } else if (form.password.length === 0) {
      this.setState({
        emailWarning: false,
        passwordWarning: true
      });
    } else {
      this.setState({
        emailWarning: false,
        passwordWarning: false
      });
      console.log("form", form);
    }
  };

  render() {
    let { emailWarning, passwordWarning } = this.state;
    return (
      <div className="container">
        <div className="card-container">
          <Form
            handleChange={this.handleChange}
            logIn={this.logIn}
            emailWarning={emailWarning}
            passwordWarning={passwordWarning}
          />
        </div>
      </div>
    );
  }
}

export default Login;

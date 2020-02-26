import React, { Component } from "react";
import Button from "../../components/Button/Button";

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
    console.log("state", this.state);
    let { emailWarning, passwordWarning } = this.state;
    return (
      <div className="container">
        <div className="card-container">
          <div className="card">
            <div>
              <h2>Github Search</h2>
            </div>
            <div>
              <form className="input-container" action="">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={this.handleChange("email")}
                />
                {emailWarning === true ? (
                  <span className="warningMsg">
                    Kérjük add meg az email címed!
                  </span>
                ) : null}
                <input
                  type="text"
                  placeholder="Password"
                  onChange={this.handleChange("password")}
                />
                {passwordWarning === true ? (
                  <span className="warningMsg">
                    Kérjük add meg a jelszavad!
                  </span>
                ) : null}
              </form>
              <Button clicked={this.logIn}> Log in </Button>
            </div>
            <div className="text-container">
              <span>
                Please sign up or sign in to use the GitHub Search App.
              </span>
              <span>
                Already have an account? Click this{" "}
                <span>
                  <a href="">link</a>
                </span>{" "}
                for sign in.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

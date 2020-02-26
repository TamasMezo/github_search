import React from "react";
import Button from "../../components/Button/Button";
import "./Form.css";

const form = props => {
  return (
    <div className="card">
      <div>
        <h2>Github Search</h2>
      </div>
      <div>
        <form className="input-container" action="">
          <input
            type="text"
            placeholder="Email"
            onChange={props.handleChange("email")}
          />
          {props.emailWarning === true ? (
            <span className="warningMsg">Kérjük add meg az email címed!</span>
          ) : null}
          <input
            type="text"
            placeholder="Password"
            onChange={props.handleChange("password")}
          />
          {props.passwordWarning === true ? (
            <span className="warningMsg">Kérjük add meg a jelszavad!</span>
          ) : null}
          {props.isSignUp ? (
            <input
              type="text"
              placeholder="Full Name"
              onChange={props.handleChange("name")}
            />
          ) : null}
          {props.nameWarning === true ? (
            <span className="warningMsg">Kérjük add meg a nevedet!</span>
          ) : null}{" "}
        </form>
        <Button clicked={props.logIn}>
          {props.isSignUp ? "Sign up" : "Log in "}
        </Button>
      </div>
      <div className="text-container">
        <span>Please sign up or sign in to use the GitHub Search App.</span>
        <span>
          {props.isSignUp
            ? "Already have an account? Click this"
            : "Don't have an account? Click this"}{" "}
          <span>
            <a href={props.isSignUp ? "/" : "/signup"}>link</a>
          </span>{" "}
          for sign in.
        </span>
      </div>
    </div>
  );
};

export default form;

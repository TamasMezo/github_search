import React, { Component } from "react";
import girhubPic from "../../assets/github.png";
import "./Logout.css";

class Logout extends Component {
  state = {};

  render() {
    return (
      <div className="lg-container">
        <div className="label-continer">
          <p> Successfull logout!</p>
          <p> Thank you for choosing our service!</p>
        </div>
        <div className="image-container">
          <img src={girhubPic} alt="Github Picture" />
        </div>
      </div>
    );
  }
}

export default Logout;

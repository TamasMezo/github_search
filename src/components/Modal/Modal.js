import React, { Component } from "react";
import "./Modal.css";
import Backdrop from "../BackDrop/BackDrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-200vh)",
            opacity: this.props.show ? "1" : "0",
            top: this.props.top
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;

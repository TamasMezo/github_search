import React, { Component } from "react";
import Button from "../../components/Button/Button";
import { Redirect } from "react-router-dom";
import * as gitHubActions from "../../actions/github.actions";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import "./Main.css";

class Main extends Component {
  state = {
    email: "",
    isLogout: false,
    searchTerm: "",
    loading: false,
    foundRepos: [],
    showModal: false,
    selectedRepo: null
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

  handleChange = input => e => {
    let targetValue = e.target.value;
    this.setState({
      [input]: targetValue
    });
  };

  search = () => {
    let { searchTerm } = this.state;
    this.setState({
      loading: true
    });
    gitHubActions
      .searchRepo(searchTerm)
      .then(response => {
        console.log("response", response);
        this.setState({
          loading: false,
          foundRepos: response.data.items
        });
      })
      .catch(error => {
        console.log("Error while searching!", error);
        this.setState({
          loading: false
        });
        throw new Error(error);
      });
  };

  showInfo = () => {
    this.setState({
      showModal: true
    });
  };

  closeInfoModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { email, isLogout, loading, showModal, selectedRepo } = this.state;

    let infomModal = null;

    if (showModal) {
      infomModal = (
        <Modal show={true} modalClosed={this.closeInfoModal} top="15%">
          <p style={{ color: "red", textAlign: "center" }}>How does it work?</p>
          <p style={{ color: "red" }}>
            1. step: Search a given term. We will list you the related repos!
          </p>
        </Modal>
      );
    }

    return (
      <div className="container">
        {isLogout === true ? <Redirect to="/logout" /> : null}
        {infomModal}
        <div className="signoutCont">
          <Button clicked={this.signOut}> Sign Out</Button>
          <Button clicked={this.showInfo}> Info</Button>
        </div>
        <div className="greeting">
          <span>Welcome, {email}</span>
        </div>
        <div className="app-container">
          {loading === true ? <Spinner /> : null}
          <div className="app">
            <div className="first-step">
              <div>
                <span>
                  Search on Github. Find what you want, just type in the search
                  below.
                </span>
              </div>
              <input
                type="text"
                className="input"
                placeholder="search term"
                onChange={this.handleChange("searchTerm")}
              />
              <Button clicked={this.search}> Find repo!</Button>
            </div>
            <div>List of repositories matched by the search.</div>
            <div>
              <div>
                <span>Selected repository: {selectedRepo} </span>
              </div>
              <Button clicked={this.signOut}> Check repo details</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

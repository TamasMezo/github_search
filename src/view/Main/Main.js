import React, { Component } from "react";
import Button from "../../components/Button/Button";
import { Redirect } from "react-router-dom";
import * as gitHubActions from "../../actions/github.actions";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import RenderItem from "../../components/RenderItem/RenderItem";
import "./Main.css";

class Main extends Component {
  state = {
    email: "",
    isLogout: false,
    searchTerm: "",
    loading: false,
    count: null,
    foundRepos: [],
    showModal: false,
    selectedRepo: null,
    showList: false
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
          count: response.data.total_count,
          foundRepos: response.data.items
        });
        this.renderList();
      })
      .catch(error => {
        console.log("Error while searching!", error);
        this.setState({
          loading: false
        });
        throw new Error(error);
      });
  };

  renderList() {
    this.setState({
      showList: true
    });
  }

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

  chooseRepo = repo => {
    this.setState({
      selectedRepo: repo,
      showList: false
    });
  };

  render() {
    const {
      email,
      isLogout,
      loading,
      showModal,
      selectedRepo,
      count,
      showList,
      foundRepos
    } = this.state;

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

    if (showList) {
      infomModal = (
        <Modal show={true} modalClosed={this.closeInfoModal} top="15%">
          <p style={{ color: "green", textAlign: "center" }}>
            List of repositories found on the given term!
          </p>
          <div>
            {foundRepos.map(repo => {
              return (
                <RenderItem
                  key={repo.id}
                  repoName={repo.name}
                  onClick={this.chooseRepo.bind(this, repo)}
                />
              );
            })}
          </div>
        </Modal>
      );
    }
    console.log("state", this.state);
    return (
      <div className="container">
        {isLogout === true ? <Redirect to="/logout" /> : null}
        {infomModal}
        <div className="signoutCont">
          <Button clicked={this.showInfo}> Info</Button>
          <Button clicked={this.signOut}> Sign Out</Button>
        </div>
        <div className="greeting">
          <span>Welcome, {email}!</span>
        </div>
        <div className="app-container">
          <div className="app">
            <div className="step">
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
              {loading === true ? <Spinner /> : null}
            </div>
            <div>Count of items: {count}</div>
            <div className="step">
              <div>
                <span>Selected Repository:</span>
                <div className="search-result">
                  {selectedRepo && (
                    <>
                      <span>Selected repository data: </span>
                      <span> Name: {selectedRepo.name}</span>
                      <span> Owner: {selectedRepo.owner.login}</span>
                      <span> Url: {selectedRepo.html_url}</span>
                      <span> Forks: {selectedRepo.forks}</span>
                      <span> Open issues: {selectedRepo.open_issues}</span>
                    </>
                  )}
                </div>
                <Button clicked={this.signOut}> Check repo details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

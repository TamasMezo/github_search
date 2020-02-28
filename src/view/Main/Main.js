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
    showList: false,
    issues: [],
    checkIssues: false,
    totalIssues: null
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

  checkIssuesByRepo = () => {
    let repo = this.state.selectedRepo;
    let fullName = repo.full_name;
    this.setState({
      loading: true
    });
    gitHubActions
      .issuesByRepo(fullName)
      .then(response => {
        console.log("herehehebbe", response);
        this.setState({
          loading: false,
          issues: response.data.items,
          totalIssues: response.data.total_count,
          checkIssues: true
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
      showModal: false,
      showList: false
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
      foundRepos,
      checkIssues,
      issues
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
          <p style={{ color: "rgb(71, 67, 67)", textAlign: "center" }}>
            List of repositories found on the given term!
          </p>
          <div>
            <ul className="list">
              {foundRepos.map(repo => {
                return (
                  <RenderItem
                    key={repo.id}
                    repoName={repo.name}
                    onClick={this.chooseRepo.bind(this, repo)}
                  />
                );
              })}
            </ul>
          </div>
        </Modal>
      );
    }

    return (
      <div className="container">
        {isLogout === true ? <Redirect to="/logout" /> : null}
        {checkIssues === true ? (
          <Redirect to={{ pathname: "/issues", state: { issues: issues } }} />
        ) : null}
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
            <div style={{ height: "5%" }}>
              Count of items:{" "}
              {count ? count : "First search for something interesting above!"}
            </div>
            <div style={{ height: "70%" }}>
              <div className="search-result">
                {selectedRepo && (
                  <>
                    <span>Selected repository data: </span>
                    <span> Name: {selectedRepo.name}</span>
                    <span> Owner: {selectedRepo.owner.login}</span>
                    <span> Url: {selectedRepo.html_url}</span>
                    <span> Forks: {selectedRepo.forks}</span>
                    <span> Open issues: {selectedRepo.open_issues}</span>
                    <span>Description: {selectedRepo.description}</span>
                    <Button>
                      <a
                        href={selectedRepo.html_url}
                        target="_blank"
                        className="link"
                      >
                        {" "}
                        Check on Github{" "}
                      </a>
                    </Button>
                    <Button clicked={this.checkIssuesByRepo}>
                      {" "}
                      Check repo issues{" "}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

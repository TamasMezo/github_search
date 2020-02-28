import React, { Component } from "react";
import "./Issue.css";
import RenderItem from "../../components/RenderItem/RenderItem";
import Button from "../../components/Button/Button";

class Issue extends Component {
  state = {
    issues: [],
    selectedIssue: null,
    closedIssues: [],
    openIssues: [],
    openIssuesClicked: false,
    closedIssuesClicked: false,
    allIssues: true
  };
  componentDidMount() {
    let allissue = this.props.location.state.issues;
    let openIssues = allissue.filter(issue => issue.state === "open");
    let closedIssues = allissue.filter(issue => issue.state === "closed");
    this.setState({
      issues: allissue,
      openIssues: openIssues,
      closedIssues: closedIssues
    });
  }

  chooseIssue = issue => {
    this.setState({
      selectedIssue: issue
    });
  };

  showOpenIssues = () => {
    this.setState({
      openIssuesClicked: true,
      closedIssuesClicked: false
    });
  };

  showClosedIssues = () => {
    this.setState({
      closedIssuesClicked: true,
      openIssuesClicked: false
    });
  };

  reset = () => {
    this.setState({
      closedIssuesClicked: false,
      openIssuesClicked: false,
      allIssues: true
    });
  };

  render() {
    let {
      issues,
      openIssues,
      closedIssues,
      openIssuesClicked,
      closedIssuesClicked,
      allIssues
    } = this.state;

    let content;

    if (allIssues) {
      content = (
        <ul className="list">
          {issues.map(issue => {
            return (
              <RenderItem
                key={issue.id}
                repoName={issue.title}
                onClick={this.chooseIssue.bind(this, issue)}
              />
            );
          })}
        </ul>
      );
    }

    if (openIssuesClicked) {
      content = (
        <ul className="list">
          {openIssues.map(issue => {
            return (
              <RenderItem
                key={issue.id}
                repoName={issue.title}
                onClick={this.chooseIssue.bind(this, issue)}
              />
            );
          })}
        </ul>
      );
    }

    if (closedIssuesClicked) {
      content = (
        <ul className="list">
          {closedIssues.map(issue => {
            return (
              <RenderItem
                key={issue.id}
                repoName={issue.title}
                onClick={this.chooseIssue.bind(this, issue)}
              />
            );
          })}
        </ul>
      );
    }
    console.log("state", this.state);
    return (
      <div className="i-container">
        <div className="label-continer">
          <p> {/* {filterName} */} Issues!</p>
        </div>
        <div className="image-container">
          <div> {issues.length > 0 ? content : "Loading"}</div>
          <div>
            <Button clicked={this.showOpenIssues}> Open Issues </Button>
            <Button clicked={this.showClosedIssues}> Closed Issues </Button>
            <Button clicked={this.reset}> Reset Filters </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;

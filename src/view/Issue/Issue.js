import React, { Component } from "react";
import "./Issue.css";
import RenderItem from "../../components/RenderItem/RenderItem";
import Button from "../../components/Button/Button";
import { Redirect } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

class Issue extends Component {
  state = {
    issues: [],
    selectedIssue: null,
    closedIssues: [],
    openIssues: [],
    openIssuesClicked: false,
    closedIssuesClicked: false,
    allIssues: true,
    filterName: "All",
    backToSearch: false
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
      closedIssuesClicked: false,
      filterName: "Open"
    });
  };

  showClosedIssues = () => {
    this.setState({
      closedIssuesClicked: true,
      openIssuesClicked: false,
      filterName: "Closed"
    });
  };

  reset = () => {
    this.setState({
      closedIssuesClicked: false,
      openIssuesClicked: false,
      allIssues: true,
      filterName: "All"
    });
  };

  handleRedirect = () => {
    this.setState({
      backToSearch: true
    });
  };

  render() {
    let {
      issues,
      openIssues,
      closedIssues,
      openIssuesClicked,
      closedIssuesClicked,
      allIssues,
      filterName,
      backToSearch
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

    if (backToSearch) {
      content = <Redirect to="/main" />;
    }

    let pieChartData;
    if (openIssues.length > 0 && closedIssues.length > 0) {
      pieChartData = {
        labels: ["Open", "Closed"],
        datasets: [
          {
            data: [openIssues.length, closedIssues.length],
            backgroundColor: ["#8A9CF8", "#1D8D9C"],
            hoverBackgroundColor: ["#8A9CF8", "#1D8D9C"]
          }
        ]
      };
    }

    return (
      <div className="i-container">
        <div className="signoutCont">
          <Button clicked={this.showInfo}> Info</Button>
          <Button clicked={this.signOut}> Sign Out</Button>
        </div>
        <div className="i-label-continer">
          {issues.length === 0 ? (
            <p> No issues found! Maybe try to find a bigger project! </p>
          ) : (
            <p> {filterName} Issues!</p>
          )}
        </div>
        <div className="image-container">
          <div className="data-container">
            <div className="issues-container"> {content}</div>
            <div className="issues-container">
              {issues.length === 0 ? null : <p>Open VS Closed issues</p>}
              <Doughnut data={pieChartData} />
            </div>
          </div>
          <div>
            <Button clicked={this.showOpenIssues}> Open Issues </Button>
            <Button clicked={this.showClosedIssues}> Closed Issues </Button>
            <Button clicked={this.reset}> Reset Filters </Button>
            <Button clicked={this.handleRedirect}> Back to seach </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;

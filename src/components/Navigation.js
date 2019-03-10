import React from "react";
import "./Navigation.scss";
import { Link, navigate } from "@reach/router";
import { Icon } from "react-materialize";
class Navigation extends React.Component {
  state = {
    navButtonOpen: false
  };
  componentDidMount() {}

  onNavigationToggle = event => {
    this.setState({ navButtonOpen: !this.state.navButtonOpen });
  };
  goToNewRaid = () => {
    this.onNavigationToggle();
    navigate("/new-raid");
  };
  goToSettings = () => {
    this.onNavigationToggle();
    navigate("/my-profile");
  };
  render() {
    return (
      <div
        className={
          "navigation-wrapper" + (this.state.navButtonOpen ? " active" : "")
        }
      >
        <button
          onClick={this.goToNewRaid}
          className="subnav__button navigation-button-raid"
        >
          <span style={{ color: "white" }} role="img" aria-label="new raid">
            <Icon>note_add</Icon>
          </span>
        </button>
        <button
          onClick={this.goToSettings}
          className="subnav__button navigation-button-settings"
        >
          <span style={{ color: "white" }} role="img" aria-label="new raid">
            <Icon>settings</Icon>
          </span>
        </button>
        <div className="navigation-button">
          {this.state.navButtonOpen ? (
            <button onClick={this.onNavigationToggle}>
              <span role="img" aria-label="open menu">
                ✖
              </span>
            </button>
          ) : (
            <button onClick={this.onNavigationToggle}>
              <span role="img" aria-label="open menu">
                ➕
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;

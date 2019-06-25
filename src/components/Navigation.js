import React from "react";
import "./Navigation.scss";
import { Link, navigate } from "@reach/router";
import { Icon } from "react-materialize";

const NewRaidButton = props => (
  <button {...props} className="subnav__button navigation-button-raid">
    <span style={{ color: "white" }} role="img" aria-label="new raid">
      <Icon>note_add</Icon>
    </span>
  </button>
);

class Navigation extends React.Component {
  state = {
    navButtonOpen: false
  };
  componentDidMount() {}

  onNavigationToggle = event => {
    this.setState({ navButtonOpen: !this.state.navButtonOpen });
  };
  goHome = () => {
    this.onNavigationToggle();
    navigate("/");
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
        <NewRaidButton onClick={this.goToNewRaid} />
        <button
          onClick={this.goHome}
          className="subnav__button navigation-button-home"
        >
          <span style={{ color: "white" }} role="img" aria-label="new raid">
            <Icon>home</Icon>
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

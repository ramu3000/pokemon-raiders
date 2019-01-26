import React from "react";
import "./Navigation.css";
import { Link, navigate } from "@reach/router";

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
  render() {
    return (
      <div
        className={
          "navigation-wrapper" + (this.state.navButtonOpen ? " active" : "")
        }
      >
        <button onClick={this.goToNewRaid} className="navigation-button-raid">
          <span role="img" aria-label="new raid">
            📯
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

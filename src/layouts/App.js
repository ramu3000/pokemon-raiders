import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "./App.scss";
import Navigation from "../components/Navigation";

import LandingPage from "./home/";
import NewRaid from "./newRaid/";
import RaidPage from "./RaidPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <LandingPage path="/" />
          <NewRaid path="new-raid" />
          <RaidPage path="raid/:id" />
        </Router>
        <Navigation />
      </div>
    );
  }
}

export default App;

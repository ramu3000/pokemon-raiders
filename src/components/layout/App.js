import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "./App.scss";
import Navigation from "../Navigation";

import RaidList from "../RaidList";
import NewRaid from "../NewRaid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <RaidList path="/" />
          <NewRaid path="new-raid" />
        </Router>
        <Navigation />
      </div>
    );
  }
}

export default App;

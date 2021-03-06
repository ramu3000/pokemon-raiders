import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "./App.scss";
import Navigation from "../Navigation";

import LandingPage from "./home/";
import NewRaid from "./newRaid/";
import RaidPage from "./RaidPage";
import MyProfile from "./my-profile";
import Queries from "./test/Queries";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <LandingPage path="/" />
          <MyProfile path="/my-profile" />
          <NewRaid path="new-raid" />
          <RaidPage path="raid/:id" />
          <Queries path="test/queries" />
        </Router>
        <Navigation />
      </div>
    );
  }
}

export default App;

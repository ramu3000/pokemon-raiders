import React, { Component } from "react";

import db from "../../utils/db";

import { RaidList } from "./../../components/RaidList";
import WithGyms from "../../components/containers/WithGyms";

class LandingPage extends Component {
  state = {
    raids: [],
    myLocation: { latitude: 0, longitude: 0 },
    closestGyms: []
  };

  componentDidMount() {
    this.getRaids();
  }

  async getRaids() {
    const raids = await db.getRaids();
    this.setState({ raids });
  }

  render() {
    console.log(this.props.gyms);
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
        <RaidList
          gyms={this.props.gyms}
          raids={this.state.raids}
          raidStatus="current"
        />
        <h2>Incoming raids</h2>
        <RaidList
          gyms={this.props.gyms}
          raids={this.state.raids}
          raidStatus="incoming"
        />
        <h2>Ended raids</h2>
        <RaidList
          gyms={this.props.gyms}
          raids={this.state.raids}
          raidStatus="ended"
        />
      </div>
    );
  }
}

export default WithGyms(LandingPage);

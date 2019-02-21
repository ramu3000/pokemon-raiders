import React, { Component } from "react";

import db from "../../utils/db";

import { RaidList } from "./../../components/RaidList";
import WithGyms from "../../components/containers/WithGyms";
import { RaidsContext } from "../../components/providers/RaidsProvider";

class LandingPage extends Component {
  state = {
    raids: [],
    myLocation: { latitude: 0, longitude: 0 },
    closestGyms: []
  };

  render() {
    return (
      <div className="raid-container">
        <RaidsContext.Consumer>
          {raids => (
            <div>
              <h2>Raid in progress</h2>
              <RaidList
                gyms={this.props.gyms}
                raids={raids}
                raidStatus="current"
              />
              <h2>Incoming raids</h2>
              <RaidList
                gyms={this.props.gyms}
                raids={raids}
                raidStatus="incoming"
              />
              <h2>Ended raids</h2>
              <RaidList
                gyms={this.props.gyms}
                raids={raids}
                raidStatus="ended"
              />
            </div>
          )}
        </RaidsContext.Consumer>
      </div>
    );
  }
}

export default WithGyms(LandingPage);

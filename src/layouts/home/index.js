import React, { Component } from "react";

import { RaidList } from "./../../components/RaidList";
import { RaidsContext } from "../../components/providers/RaidsProvider";

class LandingPage extends Component {
  render() {
    return (
      <div className="raid-container">
        <RaidsContext.Consumer>
          {raids => {
            console.log("raidsconsumer", raids);
            return (
              <div>
                <h2>Raid in progress</h2>
                <RaidList raids={raids} raidStatus="current" />
                <h2>Incoming raids</h2>
                <RaidList raids={raids} raidStatus="incoming" />
                <h2>Ended raids</h2>
                <RaidList raids={raids} raidStatus="ended" />
              </div>
            );
          }}
        </RaidsContext.Consumer>
      </div>
    );
  }
}

export default LandingPage;

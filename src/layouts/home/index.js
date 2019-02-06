import React, { Component } from "react";
import { geolocated } from "react-geolocated";

import db from "../../utils/db";
import { addDistanceToGyms } from "../../utils";

import { RaidList } from "./../../components/RaidList";

class LandingPage extends Component {
  state = {
    gyms: [],
    raids: [],
    myLocation: { latitude: 0, longitude: 0 },
    closestGyms: []
  };

  componentDidMount() {
    this.getGyms();
    this.getRaids();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isGeolocationEnabled && this.props.coords) {
      if (this.props.coords !== prevProps.coords) {
        this.addGymLocation();
      }
    }
  }

  async getGyms() {
    const gyms = await db.getGyms();
    this.setState({ gyms });
  }

  async getRaids() {
    const raids = await db.getRaids();
    this.setState({ raids });
  }

  addGymLocation() {
    let gyms = [];
    if (this.props.coords && this.props.coords.latitude) {
      gyms = addDistanceToGyms(this.state.gyms, {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      });
    }
    this.setState({ gyms });
  }

  onEveryMinuteUpdateTimeElapsed() {
    console.log("minut");
  }

  onCompletion() {
    console.log("oncomplete");
  }

  render() {
    return (
      <div className="raid-container">
        <h2>Raid in progress</h2>
        <RaidList
          gyms={this.state.gyms}
          raids={this.state.raids}
          raidStatus="current"
        />
        <h2>Incoming raids</h2>
        <RaidList
          gyms={this.state.gyms}
          raids={this.state.raids}
          raidStatus="incoming"
        />
        <h2>Ended raids</h2>
        <RaidList
          gyms={this.state.gyms}
          raids={this.state.raids}
          raidStatus="ended"
        />
        <ul />
        <div>
          Debug info coords latitude:{" "}
          {this.props.coords && this.props.coords.latitude} <br />
          longitude: {this.props.coords && this.props.coords.longitude}
        </div>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true,
  userDecisionTimeout: 5000
})(LandingPage);

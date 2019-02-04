import React, { Component } from "react";
import { geolocated } from "react-geolocated";

import RaidCard from "./RaidCard";
import db from "../utils/db";
import { addGymsDistance } from "../utils";
import { isPast, isFuture } from "../utils/dateFormatting";

class RaidList extends Component {
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
        const { latitude, longitude } = this.props.coords;
        this.setState({ myLocation: { latitude, longitude } });
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

  filterRaidList(gyms, raidstatus) {
    switch (raidstatus) {
      case "current":
        return gyms.filter(
          raid => isPast(raid.startTime) && isFuture(raid.endTime)
        );
      case "incoming":
        return gyms
          .filter(raid => isFuture(raid.startTime))
          .sort(
            ({ startTime }, { startTime: startTime2 }) => startTime > startTime2
          );
      case "ended":
        return gyms.filter(raid => isPast(raid.endTime));
      default:
        return [...gyms];
    }
  }

  raidList(raidstatus) {
    let raids = [];
    if (this.state.gyms.length === 0) return;
    const gyms = [...this.state.gyms];
    const gymsWithHasRaids = this.state.raids.map(function(raid) {
      const gym = gyms.find(gym => gym.id === raid.gym);
      if (!gym) return null;
      return {
        id: raid.id,
        name: gym.name,
        distance: gym.distance,
        level: raid.level,
        boss: raid.boss,
        players: raid.playerQue,
        endTime: raid.endTime,
        startTime: raid.startTime
      };
    });
    const filteredRaids = this.filterRaidList(gymsWithHasRaids, raidstatus);
    raids = addGymsDistance(filteredRaids, this.state.myLocation);

    return (
      <ul>
        {raids.map(function(gymRaid, i) {
          if (!gymRaid) {
            return null;
          }

          return (
            <RaidCard
              key={gymRaid.id}
              distance={gymRaid.distance}
              name={gymRaid.name}
              level={gymRaid.level}
              players={gymRaid.players}
              boss={gymRaid.boss}
              endTime={gymRaid.endTime}
              startTime={gymRaid.startTime}
            />
          );
        })}
      </ul>
    );
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
        {this.raidList("current")}
        <h2>incoming raids</h2>
        {this.raidList("incoming")}
        <h2>Ended raids</h2>
        {this.raidList("ended")}
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
})(RaidList);

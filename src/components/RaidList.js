import React, { Component } from "react";
import RaidCard from "./RaidCard";

import db from "../utils/db";
import { addGymsDistance } from "../utils";
import { isPast, isFuture } from "../utils/dateFormatting";
import { GetMyLocation } from "../components/common/location";

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

  componentDidUpdate() {}

  async getGyms() {
    const gyms = await db.getGyms();
    this.setState({ gyms });
  }

  async getRaids() {
    const raids = await db.getRaids();
    this.setState({ raids });
  }

  location = (latitude, longitude) => {
    this.setState({ myLocation: { latitude, longitude } });
  };

  raidList(raidstatus) {
    const gyms = addGymsDistance(this.state.gyms, this.state.myLocation);
    let raids = [];
    if (gyms.length === 0) return;
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
    switch (raidstatus) {
      case "current":
        raids = gymsWithHasRaids.filter(
          raid => isPast(raid.startTime) && isFuture(raid.endTime)
        );
        break;
      case "incoming":
        raids = gymsWithHasRaids
          .filter(raid => isFuture(raid.startTime))
          .sort(
            ({ startTime }, { startTime: startTime2 }) => startTime > startTime2
          );
        break;
      case "ended":
        raids = gymsWithHasRaids.filter(raid => isPast(raid.endTime));
        break;
      default:
        raids = [...gymsWithHasRaids];
        break;
    }
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
        <GetMyLocation myLocation={this.location} />
        <h2>Raid in progress</h2>
        {this.raidList("current")}
        <h2>incoming raids</h2>
        {this.raidList("incoming")}
        <h2>Ended raids</h2>
        {this.raidList("ended")}
        <ul />
        <div>
          Debug info coords latitude: {this.state.myLocation.latitude}
          longitude: {this.state.myLocation.longitude}
        </div>
      </div>
    );
  }
}

export default RaidList;

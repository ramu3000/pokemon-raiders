import React from "react";

import { navigate } from "@reach/router";
import addMinutes from "date-fns/add_minutes";
import db from "../utils/db";
import { addGymsDistance } from "../utils";
import "./NewRaid.css";
import {
  WizardPageOne,
  PageTwo,
  PageThree,
  WizardPageFourNotStarted,
  WizardPageFourHasStarted,
  WizardPageFiveChooseRaidBoss
} from "./wizard";

export default class NewRaid extends React.Component {
  state = {
    gyms: [],
    filterDistance: 1000,
    gymTime: 45,
    step: 1,
    newRaid: {
      difficulty: 0,
      gym: null,
      active: false,
      startTime: null
    }
  };
  componentDidMount() {
    this.getGyms();
  }
  onBack = () => {
    if (this.state.step >= 2) {
      this.setState({ step: this.state.step - 1 });
    } else {
      navigate("/");
    }
  };
  onAddGym = event => {
    const gymId = event.target.dataset.id;
    const raid = { ...this.state.newRaid, gym: gymId };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  onAddRating = difficulty => {
    const raid = { ...this.state.newRaid, difficulty };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  handleRaidStarted = event => {
    if (!event.target.dataset.started) {
      console.error("no value given for raid start");
      return null;
    }
    const raidStarted = event.target.dataset.started === "true";
    const raid = { ...this.state.newRaid, active: raidStarted };
    this.setState({ newRaid: raid });
    this.goToNextStep();
  };
  setStartTime = event => {
    const startTime = addMinutes(new Date(), event.target.value);
    const raid = { ...this.state.newRaid, startTime };
    this.setState({ newRaid: raid });
  };
  setEndTime = event => {
    const endTime = addMinutes(new Date(), event.target.value);
    const raid = { ...this.state.newRaid, endTime };
    this.setState({ newRaid: raid }, this.goToNextStep);
  };
  goToNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };
  onSaveRaid = () => {
    const registeredTime = new Date();
    let raid = null;

    if (this.state.newRaid.startTime) {
      const endTime = addMinutes(
        this.state.newRaid.startTime,
        this.state.gymTime
      );
      raid = { ...this.state.newRaid, endTime, registeredTime };
    } else if (this.state.newRaid.endTime) {
      const startTime = addMinutes(
        this.state.newRaid.endTime,
        -this.state.gymTime
      );

      raid = { ...this.state.newRaid, startTime, registeredTime };
    } else {
      console.error("time has not been added");
      return;
    }
    this.setState({ newRaid: raid }, () => {
      this.saveData(raid);
    });
  };
  async saveData(raid) {
    await db.saveRaid(raid);
    navigate("/");
  }
  async getGyms() {
    const querySnapshot = await db.gyms;
    const gyms = [];
    querySnapshot.forEach(gym => {
      const data = gym.data();
      gyms.push({
        id: gym.id,
        name: data.name,
        coords: data.coords
      });
    });

    const gymsWithDistance = addGymsDistance(gyms, {
      latitude: 60.1838972,
      longitude: 24.9816705
    });
    const filterDistanceGyms = gymsWithDistance.filter(
      obj => obj.distance < this.state.filterDistance
    );
    filterDistanceGyms.sort((a, b) => {
      return a.distance - b.distance;
    });
    this.setState({ gyms: filterDistanceGyms });
  }

  render() {
    const { step } = this.state;
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        {step === 1 && (
          <WizardPageOne
            onBack={this.onBack}
            gyms={this.state.gyms}
            addGym={this.onAddGym}
          />
        )}
        {step === 2 && (
          <PageTwo
            onBack={this.onBack}
            difficulty={this.state.newRaid.difficulty}
            addRating={this.onAddRating}
          />
        )}
        {step === 3 && (
          <PageThree onBack={this.onBack} hasStarted={this.handleRaidStarted} />
        )}
        {step === 4 &&
          this.state.newRaid.active && (
            <WizardPageFourHasStarted
              setTime={this.setEndTime}
              saveRaid={this.onSaveRaid}
            />
          )}
        {step === 4 &&
          !this.state.newRaid.active && (
            <WizardPageFourNotStarted
              setTime={this.setStartTime}
              saveRaid={this.onSaveRaid}
            />
          )}
        {step === 5 &&
          this.state.newRaid.active && (
            <WizardPageFiveChooseRaidBoss
              bossPool={[]}
              saveRaid={this.onSaveRaid}
            />
          )}
      </div>
    );
  }
}

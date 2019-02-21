import React from "react";
import { navigate } from "@reach/router";
import addMinutes from "date-fns/add_minutes";

import db from "../../utils/db";
import "./NewRaid.css";
import {
  WizardPageOne,
  PageTwo,
  PageThree,
  WizardPageFourNotStarted,
  WizardPageFourHasStarted,
  WizardPageFiveChooseRaidBoss
} from "../../components/wizard";
import withGyms from "../../components/containers/WithGyms";

class NewRaid extends React.Component {
  state = {
    gyms: [],
    gymTime: 45,
    step: 1,
    newRaid: {
      difficulty: 0,
      gym: null,
      active: false,
      startTime: null
    }
  };
  filterDistance = 1000;
  componentDidMount() {}

  onBack = () => {
    if (this.state.step >= 2) {
      this.setState({ step: this.state.step - 1 });
    } else {
      navigate("/");
    }
  };
  onAddGym = event => {
    const gymId = event.target.dataset.id;
    const gymData = this.state.gyms.filter(gym => gym.id === gymId);
    console.log(gymData);
    const raid = { ...this.state.newRaid, gym: gymId, gymData: gymData[0] };
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

  sortByDistance(maxDistance) {
    //filter out gyms what you cant see from pokemon go app
    const filterDistanceGyms = this.props.gyms.filter(
      obj => obj.distance < maxDistance
    );
    //sort by ascending distance
    filterDistanceGyms.sort((a, b) => {
      return a.distance - b.distance;
    });

    return filterDistanceGyms;
  }

  render() {
    const { step } = this.state;
    const gyms = this.sortByDistance(this.filterDistance);
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        {step === 1 && (
          <WizardPageOne
            onBack={this.onBack}
            gyms={gyms}
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
        {step === 4 && this.state.newRaid.active && (
          <WizardPageFourHasStarted
            setTime={this.setEndTime}
            saveRaid={this.onSaveRaid}
          />
        )}
        {step === 4 && !this.state.newRaid.active && (
          <WizardPageFourNotStarted
            setTime={this.setStartTime}
            saveRaid={this.onSaveRaid}
          />
        )}
        {step === 5 && this.state.newRaid.active && (
          <WizardPageFiveChooseRaidBoss
            bossPool={[]}
            saveRaid={this.onSaveRaid}
          />
        )}
      </div>
    );
  }
}

export default withGyms(NewRaid);

import React from "react";
import { navigate } from "@reach/router";
import addMinutes from "date-fns/add_minutes";

import db from "../../utils/db";
import "./NewRaid.css";
import ChooseGym from "./wizard/ChooseGym";
import ChooseDifficulty from "./wizard/ChooseDifficulty";
import HasRaidStarted from "./wizard/HasRaidStarted";
import ChooseStartTime from "./wizard/ChooseStartTime";

import { WizardPageFiveChooseRaidBoss } from "../../components/wizard";
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

  onValueSave = ({ key, value }, nextStep = true) => {
    if (!key && !value) return;
    this.setState({ newRaid: { ...this.state.newRaid, [key]: value } });
    if (nextStep) {
      console.log("next step");
      this.goToNextStep();
    }
  };

  goToNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  onSaveRaid = () => {
    const registeredTime = new Date();
    let raid = {};
    const gymDataArray = this.props.gyms.filter(
      gym => gym.id === this.state.newRaid.gym
    );
    const [currentGymData] = gymDataArray;
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
    raid = { ...raid, gymData: currentGymData };
    this.setState({ newRaid: raid }, () => {
      this.saveData(raid);
    });
  };
  async saveData(raid) {
    try {
      await db.saveRaid(raid);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  filterGymsAndSortByDistance(gyms, maxDistance) {
    //filter out gyms what you cant see from pokemon go app
    const filterDistanceGyms = gyms.filter(obj => obj.distance < maxDistance);
    //sort by ascending distance
    filterDistanceGyms.sort((a, b) => {
      return a.distance - b.distance;
    });

    return filterDistanceGyms;
  }

  render() {
    const { step } = this.state;
    const gyms = this.filterGymsAndSortByDistance(
      this.props.gyms,
      this.filterDistance
    );
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        {step === 1 && (
          <ChooseGym
            onBack={this.onBack}
            gyms={gyms}
            addGym={this.onValueSave}
          />
        )}
        {step === 2 && (
          <ChooseDifficulty
            onBack={this.onBack}
            difficulty={this.state.newRaid.difficulty}
            addRating={this.onValueSave}
          />
        )}
        {step === 3 && (
          <HasRaidStarted onBack={this.onBack} hasStarted={this.onValueSave} />
        )}
        {step === 4 && (
          <ChooseStartTime
            setTime={this.setEndTime}
            saveRaid={this.onValueSave}
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

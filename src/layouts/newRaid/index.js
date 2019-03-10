import React from "react";
import { navigate } from "@reach/router";
import addMinutes from "date-fns/add_minutes";

import db from "../../utils/db";
import "./NewRaid.scss";
import ChooseGym from "./wizard/ChooseGym";
import ChooseDifficulty from "./wizard/ChooseDifficulty";
import HasRaidStarted from "./wizard/HasRaidStarted";
import ChooseStartTime from "./wizard/ChooseStartTime";
import ChoosePokemon from "./wizard/ChoosePokemon";
import Stepper from "./wizard/Stepper";
import withGyms from "../../components/containers/WithGyms";

const Pokemons = [
  { name: "DIALGA", tier: 5 },
  { name: "POLIWRATH", tier: 4 },
  { name: "ALOLAN MAROWAK", tier: 4 },
  { name: "RHYDON", tier: 4 },
  { name: "TYRANITAR", tier: 4 },
  { name: "ABSOL", tier: 4 }
];

class NewRaid extends React.Component {
  state = {
    gyms: [],
    gymTime: 45,
    currentStep: 1,
    savedStep: 1,
    newRaid: {
      difficulty: 0,
      gym: null,
      active: false,
      startTime: null,
      endTime: null,
      boss: ""
    }
  };
  filterDistance = 1000;
  componentDidMount() {}

  onBack = () => {
    if (this.state.currentStep >= 2) {
      this.setState({ currentStep: this.state.currentStep - 1 });
    } else {
      navigate("/");
    }
  };
  onNext = () => {
    if (this.state.currentStep <= 4) {
      this.setState({ currentStep: this.state.currentStep + 1 });
    }
  };

  onValueSave = ({ key, value }, nextStep = true) => {
    if (!key && !value) return;
    this.setState({ newRaid: { ...this.state.newRaid, [key]: value } }, () => {
      if (nextStep) {
        this.goToNextStep();
      } else {
        this.onSaveRaid();
      }
    });
  };

  goToNextStep = () => {
    const savedStep =
      this.state.currentStep >= this.state.savedStep
        ? this.state.currentStep + 1
        : this.state.savedStep;

    this.setState({ currentStep: this.state.currentStep + 1, savedStep });
  };

  onSaveRaid = () => {
    const {
      active,
      startTime: startTimeInMinutes,
      endTime: endTimeInMinutes
    } = this.state.newRaid;
    const registeredTime = new Date();
    let raid = {};
    const gymDataArray = this.props.gyms.filter(
      gym => gym.id === this.state.newRaid.gym
    );
    const [currentGymData] = gymDataArray;
    if (!active) {
      const startTime = addMinutes(new Date(), startTimeInMinutes);
      const endTime = addMinutes(startTime, this.state.gymTime);
      raid = { ...this.state.newRaid, startTime, endTime, registeredTime };
    } else if (active) {
      const endTime = addMinutes(new Date(), endTimeInMinutes);
      const startTime = addMinutes(endTime, -this.state.gymTime);
      raid = { ...this.state.newRaid, endTime, startTime, registeredTime };
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
    const { currentStep } = this.state;
    const gyms = this.filterGymsAndSortByDistance(
      this.props.gyms,
      this.filterDistance
    );
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <div className="steps__wrapper">
          {currentStep === 1 && (
            <ChooseGym
              onBack={this.onBack}
              gyms={gyms}
              addGym={this.onValueSave}
            />
          )}
          {currentStep === 2 && (
            <ChooseDifficulty
              onBack={this.onBack}
              difficulty={this.state.newRaid.difficulty}
              addRating={this.onValueSave}
            />
          )}
          {currentStep === 3 && (
            <HasRaidStarted
              onBack={this.onBack}
              hasStarted={this.onValueSave}
            />
          )}
          {currentStep === 4 && (
            <ChooseStartTime
              active={this.state.newRaid.active}
              saveRaid={this.onValueSave}
              startTime={this.state.newRaid.startTime}
              endTime={this.state.newRaid.endTime}
            />
          )}
          {currentStep === 5 && this.state.newRaid.active && (
            <ChoosePokemon bossPool={Pokemons} saveRaid={this.onValueSave} />
          )}
        </div>
        <Stepper
          back={this.onBack}
          next={this.onNext}
          hasNext={this.state.currentStep < this.state.savedStep}
        />
      </div>
    );
  }
}

export default withGyms(NewRaid);

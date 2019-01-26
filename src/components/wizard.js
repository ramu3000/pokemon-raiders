import React from "react";
import Rating from "react-rating";

import GymCard from "./GymCard";
import "./wizard.css";

export const WizardPageOne = props => {
  function renderGyms() {
    if (props.gyms.length === 0) return null;

    const gymListHtml = props.gyms.map(gym => (
      <GymCard
        key={gym.id}
        id={gym.id}
        name={gym.name}
        distance={gym.distance}
        step={props.addGym}
      />
    ));
    return <ul>{gymListHtml}</ul>;
  }
  return (
    <div>
      <button onClick={props.onBack}>back</button>
      <h2>Choose your gym</h2>
      <p>please choose gym where raid is starting </p>
      {renderGyms()}
    </div>
  );
};

export const PageTwo = props => {
  const { onBack, addRating, difficulty } = props;
  return (
    <div>
      <h2>Boss dificulty</h2>
      <p>Add boss dificulty</p>
      <button onClick={onBack}>back</button>
      <Rating onChange={addRating} initialRating={difficulty} />
    </div>
  );
};
export const PageThree = props => {
  const { hasStarted } = props;
  return (
    <div>
      <h2>Has it started yet?</h2>
      <p>Please choose yes or no</p>
      <button data-started="true" onClick={hasStarted}>
        Yes
      </button>
      <button data-started="false" onClick={hasStarted}>
        No
      </button>
      <button onClick={props.onBack}>back</button>
    </div>
  );
};

export const WizardPageFourNotStarted = props => {
  const { setTime, saveRaid } = props;
  return (
    <div>
      <h2>When does it start</h2>
      <p> it starts in... minutes</p>
      <input onChange={setTime} type="number" min="1" max="90" />
      <button className="green" onClick={saveRaid}>
        Save Raid
      </button>
    </div>
  );
};
export const WizardPageFourHasStarted = props => {
  const { setTime, saveRaid } = props;
  return (
    <div>
      <h2>How much time left?</h2>
      <p> it ends in... minutes</p>
      <input onChange={setTime} type="number" min="1" max="90" />
      <button className="green" onClick={saveRaid}>
        Save Raid
      </button>
      <button className="green" onClick={saveRaid}>
        Save raid and ask help
      </button>
    </div>
  );
};

export const WizardPageFiveChooseRaidBoss = props => {
  const { bossPool, saveRaid } = props;
  return (
    <div>
      <h2>What is the RaidBoss</h2>
      <ul>
        <li>Pikachu</li>
        <li>Heatron</li>
        <li>Snorlax</li>
        <li>Magikarp</li>
      </ul>
      <button className="green" onClick={saveRaid}>
        Save raid and exit
      </button>
      <button className="green" onClick={saveRaid}>
        Save raid and ask help
      </button>
    </div>
  );
};

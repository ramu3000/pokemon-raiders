import React from "react";

import GymCard from "../../../components/common/GymCard";

const ChooseGym = props => {
  const onGymSave = event => {
    const { id } = event.target.dataset;
    props.addGym({ key: "gym", value: id });
  };

  function renderGyms() {
    if (props.gyms.length === 0) return null;

    const gymListHtml = props.gyms.map(gym => (
      <GymCard
        key={gym.id}
        id={gym.id}
        name={gym.name}
        distance={gym.distance}
        onSave={onGymSave}
      />
    ));
    return <ul>{gymListHtml}</ul>;
  }
  return (
    <div>
      <h2>Choose your gym</h2>
      <p>please choose gym where raid is starting </p>
      {renderGyms()}
    </div>
  );
};

export default ChooseGym;

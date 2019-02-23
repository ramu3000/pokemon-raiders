import React from "react";

const HasRaidStarted = props => {
  const { hasStarted } = props;

  const onSave = event => {
    const raidStarted = event.target.dataset.started === "true";
    hasStarted({ key: "active", value: raidStarted });
  };

  return (
    <div>
      <h2>Has it started yet?</h2>
      <p>Please choose yes or no</p>
      <button data-started="true" onClick={onSave}>
        Yes
      </button>
      <button data-started="false" onClick={onSave}>
        No
      </button>
      <button onClick={props.onBack}>back</button>
    </div>
  );
};

export default HasRaidStarted;

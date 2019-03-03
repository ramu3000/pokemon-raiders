import React from "react";
import { Button } from "react-materialize";

const HasRaidStarted = props => {
  const { hasStarted } = props;

  const onSave = event => {
    const raidStarted = event.target.dataset.started === "true";
    hasStarted({ key: "active", value: raidStarted });
  };

  return (
    <div>
      <h2>Has it started yet?</h2>
      <div className="button--actions">
        <Button data-started="true" className="blue" onClick={onSave}>
          Yes
        </Button>
        <Button data-started="false" className="blue" onClick={onSave}>
          No
        </Button>
      </div>
    </div>
  );
};

export default HasRaidStarted;

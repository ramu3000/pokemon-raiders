import React from "react";
import Button from "@material-ui/core/Button";

const HasRaidStarted = props => {
  const { hasStarted } = props;

  const onSave = event => {
    let raidStarted = null;
    event.persist();
    if (event.target.dataset.hasOwnProperty("started")) {
      raidStarted = event.target.dataset.started === "true";
    } else {
      raidStarted = event.target.parentElement.dataset.started === "true";
    }
    hasStarted({ key: "active", value: raidStarted });
  };

  return (
    <div>
      <h2>Has it started yet?</h2>
      <div className="button--actions">
        <Button
          variant="contained"
          color="primary"
          data-started="true"
          className="blue"
          onClick={onSave}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-started="false"
          className="blue"
          onClick={onSave}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default HasRaidStarted;

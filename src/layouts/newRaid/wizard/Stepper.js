import React from "react";
import { Icon, Button } from "@material-ui/core";

const Wrapper = () => {
  const css = `
  width: 100%;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  box-sizing: border-box;`;
};
const ButtonTwo = () => {
  const css = `background: #22292F;
  padding: 15px 38px;
  border: none;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 7px 0px grey;`;
};

const Stepper = ({ back, next, hasNext }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px"
      }}
    >
      <div>
        <Button variant="contained" color="secondary" onClick={back}>
          <Icon>navigate_before</Icon>Back
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          disabled={!hasNext}
          onClick={next}
        >
          Next<Icon>navigate_next</Icon>
        </Button>
      </div>
    </div>
  );
};

export default Stepper;

import React from "react";
import { Button, Icon } from "react-materialize";

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

const Stepper = ({ back, next }) => {
  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "space-around" }}
    >
      <div>
        <Button waves="light" onClick={back}>
          <Icon left>navigate_before</Icon>Back
        </Button>
      </div>
      <div>
        <Button waves="light" onClick={next}>
          <Icon right>navigate_next</Icon>Next
        </Button>
      </div>
    </div>
  );
};

export default Stepper;

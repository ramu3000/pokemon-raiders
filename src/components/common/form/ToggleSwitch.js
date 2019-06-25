import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ToggleSwitch = ({
  checked,
  handleChange,
  value,
  color,
  disabled,
  labelTxt
}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          value={value}
          color={color}
          disabled={disabled}
        />
      }
      label={labelTxt}
      labelPlacement="start"
    />
  );
};

export default ToggleSwitch;

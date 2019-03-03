import React from "react";

const success = position => {
  console.log(position);
};
const error = error => {
  console.log(error);
};
export const ErrorMessage = ({ message }) => (
  <div style={{ padding: "20px" }}>
    Without you accepting the location I can't retrieve closest RAIDS for you,
    please allow location for getting closest gyms.
    <br /> <br /> Error Message:
    <b>{message}</b>
    <button
      onClick={() => navigator.geolocation.getCurrentPosition(success, error)}
    >
      get location
    </button>
    <br />
    <br />
    <br />
    You might ask why?
    <br />
    This is because of not pulling raids for you from other side of world and it
    keeps server cost small. For now there is no workaround or other solutions.
    But I'm developing the app constantly to make it even better experience for
    you and your friends. You can always ask from discord more information
  </div>
);

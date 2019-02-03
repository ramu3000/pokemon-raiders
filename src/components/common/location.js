import React from "react";

export const GetMyLocation = props => {
  if (!props.myLocation) return null;

  if (!("geolocation" in navigator) || !navigator.geolocation) {
    console.log("no access or geolocation in navigator");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      props.myLocation(latitude, longitude);
    },
    err => {
      console.log(err);
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
  );
  return null;
};

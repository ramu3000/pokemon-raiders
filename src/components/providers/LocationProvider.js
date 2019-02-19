import React, { Component, createContext } from "react";
import { geolocated } from "react-geolocated";

export const LocationContext = createContext();

class LocationProvider extends Component {
  state = { coords: null };

  componentDidMount = () => {};

  render() {
    const { coords, children } = this.props;
    return (
      <LocationContext.Provider value={coords}>
        {children}
      </LocationContext.Provider>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true,
  userDecisionTimeout: 5000
})(LocationProvider);

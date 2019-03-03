import React, { Component, createContext } from "react";
import { geolocated } from "react-geolocated";

export const LocationContext = createContext();

class LocationProvider extends Component {
  state = { coords: null };

  componentDidMount = () => {};

  render() {
    console.log("locationprovider", this.props);
    const {
      coords,
      children,
      positionError,
      isGeolocationAvailable
    } = this.props;
    return (
      <LocationContext.Provider
        value={{ coords, positionError, isGeolocationAvailable }}
      >
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

import React, { Component, createContext } from "react";

import { firestore } from "../../firebase";
import {
  collectIdsAndDocs,
  encodeGeohash,
  addDistanceToGyms
} from "../../utils";
import { LocationContext } from "../providers/LocationProvider";

export const GymsContext = createContext();

class GymsProvider extends Component {
  state = {
    gyms: [],
    loading: true,
    playerLastQueryLocation: {
      latitude: null,
      longitude: null
    }
  };
  unsubscribeFromFirestore = null;

  geohashProximity = 4;

  componentDidMount = () => {};
  componentDidUpdate() {
    if (this.props.context && this.state.loading) {
      const { latitude, longitude } = this.props.context;
      const geohash = encodeGeohash(
        [latitude, longitude],
        this.geohashProximity
      );
      this.unsubscribeFromFirestore = firestore
        .collection("gyms")
        .where("geohash", ">=", geohash)
        .orderBy("geohash")
        .onSnapshot(snapshot => {
          const gyms = snapshot.docs.map(collectIdsAndDocs);
          this.setState({
            gyms,
            loading: false,
            playerLastQueryLocation: { latitude, longitude }
          });
        });
    }
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    let { gyms } = this.state;
    const { children } = this.props;

    if (this.props.context) {
      const { latitude, longitude } = this.props.context;
      gyms = addDistanceToGyms(gyms, {
        latitude,
        longitude
      });
    }

    return <GymsContext.Provider value={gyms}>{children}</GymsContext.Provider>;
  }
}

const Location = props => (
  <LocationContext.Consumer>
    {context => <GymsProvider context={context} {...props} />}
  </LocationContext.Consumer>
);

export default Location;
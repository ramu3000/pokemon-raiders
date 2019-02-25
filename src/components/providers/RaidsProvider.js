import React, { Component, createContext } from "react";
import { firestore } from "../../firebase";
import { collectRaidInfo, encodeGeohash, addDistanceToGyms } from "../../utils";
import { LocationContext } from "../providers/LocationProvider";

export const RaidsContext = createContext();

class RaidProvider extends Component {
  state = {
    raids: [],
    loading: true,
    playerLastQueryLocation: { latitude: null, longitude: null }
  };
  unsubscribeFromFirestore = null;
  geohashProximity = 4;

  componentDidUpdate() {
    if (this.props.context && this.state.loading) {
      const { latitude, longitude } = this.props.context;
      const geohash = encodeGeohash(
        [latitude, longitude],
        this.geohashProximity
      );
      this.unsubscribeFromRaidsFirestore = firestore
        .collection("raids")
        .where("gymData.geohash", ">=", geohash)
        .orderBy("gymData.geohash")
        .limit(10)
        .onSnapshot(snapshot => {
          const raids = snapshot.docs.map(collectRaidInfo);
          console.log("snapshot", raids);
          this.setState({
            raids,
            loading: false,
            playerLastQueryLocation: { latitude, longitude }
          });
        });
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromRaidsFirestore();
  }

  render() {
    const { children } = this.props;

    let raids = this.state.raids;
    if (this.props.context) {
      const { latitude, longitude } = this.props.context;
      raids = addDistanceToGyms(raids, {
        latitude,
        longitude
      });
    }
    console.log("RaidsProvider:", raids);
    return (
      <RaidsContext.Provider value={raids}>{children}</RaidsContext.Provider>
    );
  }
}

const Location = props => (
  <LocationContext.Consumer>
    {context => <RaidProvider context={context} {...props} />}
  </LocationContext.Consumer>
);

export default Location;

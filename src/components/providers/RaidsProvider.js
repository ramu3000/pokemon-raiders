import React, { Component, createContext } from "react";
import { firestore } from "../../firebase";
import { collectRaidInfo, encodeGeohash, addDistanceToGyms } from "../../utils";
import { LocationContext } from "../providers/LocationProvider";
import { ErrorMessage } from "../common/error/location";
import addMinutes from "date-fns/add_minutes";
export const RaidsContext = createContext();

class RaidProvider extends Component {
  state = {
    raids: [],
    loading: true,
    playerLastQueryLocation: { latitude: null, longitude: null }
  };
  unsubscribeFromFirestore = null;
  geohashProximity = 4;

  get raidsRef() {
    return firestore.collection("raids");
  }

  componentDidUpdate() {
    if (this.props.context.coords && this.state.loading) {
      console.log("componentdidupdate", this.props.context.coords);
      const { latitude, longitude } = this.props.context.coords;
      const geohash = encodeGeohash(
        [latitude, longitude],
        this.geohashProximity
      );
      const endTimeAfterRange = addMinutes(new Date(), 120);
      const endTimeBeforeRange = addMinutes(new Date(), -60);
      this.unsubscribeFromRaidsFirestore = this.raidsRef
        .where("endtime", "<=", endTimeAfterRange)
        .where("endtime", ">=", endTimeBeforeRange)
        .orderBy("endtime", "desc")
        .limit(10)
        .onSnapshot(snapshot => {
          const raids = snapshot.docs.map(collectRaidInfo);
          this.setState({
            raids,
            loading: false,
            playerLastQueryLocation: { latitude, longitude }
          });
        });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeFromRaidsFirestore) {
      this.unsubscribeFromRaidsFirestore();
    }
  }

  render() {
    const { children } = this.props;

    let raids = this.state.raids;
    if (this.props.context.coords) {
      const { latitude, longitude } = this.props.context.coords;
      raids = addDistanceToGyms(raids, {
        latitude,
        longitude
      });
    } else {
      if (this.props.context.positionError) {
        return (
          <ErrorMessage message={this.props.context.positionError.message} />
        );
      }
    }
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

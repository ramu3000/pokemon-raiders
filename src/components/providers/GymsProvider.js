import React, { Component, createContext } from "react";

import { firestore } from "../../firebase";
import { collectIdsAndDocs } from "../../utils";
import { LocationContext } from "../providers/LocationProvider";

export const GymsContext = createContext();
//https://jsbin.com/mosiza/53/edit?html,js,output
//https://www.youtube.com/watch?v=mx1mMdHBi5Q
class GymsProvider extends Component {
  state = {
    gyms: [],
    loading: false
  };
  unsubscribeFromFirestore = null;

  componentDidMount = () => {};
  componentDidUpdate() {
    console.log(this.props.context);
    if (this.props.context && !this.state.loading) {
      const geohash = encodeGeohash(
        [this.props.context.latitude, this.props.context.longitude],
        3
      );
      this.unsubscribeFromFirestore = firestore
        .collection("gyms")
        .where("geohash", ">=", geohash)
        .orderBy("geohash")
        .onSnapshot(snapshot => {
          const gyms = snapshot.docs.map(collectIdsAndDocs);
          this.setState({ gyms, loading: true });
        });
    }
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { gyms } = this.state;
    const { children } = this.props;

    return <GymsContext.Provider value={gyms}>{children}</GymsContext.Provider>;
  }
}

const Location = props => (
  <LocationContext.Consumer>
    {context => <GymsProvider context={context} {...props} />}
  </LocationContext.Consumer>
);

export default Location;

var g_GEOHASH_PRECISION = 10;
var g_BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
var encodeGeohash = function(location, precision) {
  validateLocation(location);
  if (typeof precision !== "undefined") {
    if (typeof precision !== "number" || isNaN(precision)) {
      throw new Error("precision must be a number");
    } else if (precision <= 0) {
      throw new Error("precision must be greater than 0");
    } else if (precision > 22) {
      throw new Error("precision cannot be greater than 22");
    } else if (Math.round(precision) !== precision) {
      throw new Error("precision must be an integer");
    }
  }

  // Use the global precision default if no precision is specified
  precision = precision || g_GEOHASH_PRECISION;

  var latitudeRange = {
    min: -90,
    max: 90
  };
  var longitudeRange = {
    min: -180,
    max: 180
  };
  var hash = "";
  var hashVal = 0;
  var bits = 0;
  var even = 1;

  while (hash.length < precision) {
    var val = even ? location[1] : location[0];
    var range = even ? longitudeRange : latitudeRange;
    var mid = (range.min + range.max) / 2;

    /* jshint -W016 */
    if (val > mid) {
      hashVal = (hashVal << 1) + 1;
      range.min = mid;
    } else {
      hashVal = (hashVal << 1) + 0;
      range.max = mid;
    }
    /* jshint +W016 */

    even = !even;
    if (bits < 4) {
      bits++;
    } else {
      bits = 0;
      hash += g_BASE32[hashVal];
      hashVal = 0;
    }
  }

  return hash;
};

var validateLocation = function(location) {
  var error;

  if (!Array.isArray(location)) {
    error = "location must be an array";
  } else if (location.length !== 2) {
    error = "expected array of length 2, got length " + location.length;
  } else {
    var latitude = location[0];
    var longitude = location[1];

    if (typeof latitude !== "number" || isNaN(latitude)) {
      error = "latitude must be a number";
    } else if (latitude < -90 || latitude > 90) {
      error = "latitude must be within the range [-90, 90]";
    } else if (typeof longitude !== "number" || isNaN(longitude)) {
      error = "longitude must be a number";
    } else if (longitude < -180 || longitude > 180) {
      error = "longitude must be within the range [-180, 180]";
    }
  }

  if (typeof error !== "undefined") {
    throw new Error("Invalid GeoFire location '" + location + "': " + error);
  }
};

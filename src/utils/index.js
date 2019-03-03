import geolib from "geolib";

/**
 *
 * @param { [ { id, coords:{latitude: 0, longitidute: 0} ...rest }, ...rest] } gyms array
 * @param {latitude: 0, longitude: 0} playerLocation object
 * @return { [ { distance: 2000, ...rest }, ...rest ] } array with objects
 * return distance property in meeters and all other info
 */
export const addDistanceToGyms = (gyms, playerLocation) => {
  const fetchedGyms = {};

  gyms.forEach(gym => {
    const id = gym.id;
    fetchedGyms[id] = {
      latitude: gym.coords.latitude,
      longitude: gym.coords.longitude
    };
  });

  const gymDistance = geolib.orderByDistance(playerLocation, fetchedGyms);
  const gymsWithDistance = gyms.map(gym => {
    let distance;
    /* todo: could be better optimized */
    gymDistance.forEach(gymWithDistance => {
      if (gym.id === gymWithDistance.key) {
        distance = gymWithDistance.distance;
      }
    });
    return { ...gym, distance };
  });

  return gymsWithDistance;
};

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const collectIdsAndDocsWithDate = doc => {
  const data = doc.data();
  const date = data.date.toDate();
  return { id: doc.id, ...data, date };
};

export const collectRaidInfo = doc => {
  const data = doc.data();
  const {
    boss,
    gym: { id: gym },
    level,
    playerQue,
    comments,
    gymData: { name: gymName, geohash, coords }
  } = data;
  return {
    id: doc.id,
    endTime: data.endtime.toDate(),
    startTime: data.starttime.toDate(),
    boss,
    gym,
    level,
    playerQue,
    gymName,
    geohash,
    coords,
    comments
  };
};
export const collectRaidInfoPage = doc => {
  const data = doc.data();
  const endTime = data.endtime.toDate();
  const startTime = data.starttime.toDate();
  return {
    id: doc.id,
    ...data,
    endTime,
    startTime
  };
};

var g_GEOHASH_PRECISION = 10;
var g_BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
//https://jsbin.com/mosiza/53/edit?html,js,output
//https://www.youtube.com/watch?v=mx1mMdHBi5Q
export const encodeGeohash = function(location, precision) {
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

const validateLocation = function(location) {
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

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const handleUserId = () => {
  if (localStorage.getItem("uid")) {
    return localStorage.getItem("uid");
  } else {
    const randomId = getRandomInt(99999).toString();
    localStorage.setItem("uid", randomId);
    return randomId;
  }
};

export const handleChatName = () => {
  if (localStorage.getItem("username")) {
    return localStorage.getItem("uid");
  } else {
    const randomId = getRandomInt(99999).toString();
    localStorage.setItem("username", randomId);
    return randomId;
  }
};

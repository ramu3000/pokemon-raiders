import geolib from "geolib";

/**
 *
 * @param { [ { id, coords:{latitude: 0, longitidute: 0} ...rest }, ...rest] } gyms array
 * @param {latitude: 0, longitude: 0} playerLocation object
 * @return { [ { distance: 2000, ...rest }, ...rest ] } array with objects
 * return distance property in meeters and all other info
 */
export const addGymsDistance = (gyms, playerLocation) => {
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
    return { distance, ...gym };
  });

  return gymsWithDistance;
};

import {
  format,
  isPast as dateFNSIsPast,
  isFuture as dateFNSisFututure
} from "date-fns";

export const formatTimesSTamp = function(timestamp) {
  return format(timestamp, "HH:mm:ss").toString();
};

export const isPast = function(timestamp) {
  return dateFNSIsPast(timestamp);
};
export const isFuture = function(timestamp) {
  return dateFNSisFututure(timestamp);
};

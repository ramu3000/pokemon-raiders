import React from "react";

const ShowDistance = ({ distance, noSignalText }) => {
  if (typeof distance !== "number") {
    return <b>{noSignalText || "cant locate...."}</b>;
  }

  const length = distance.toString().length;

  switch (length) {
    case 1:
    case 2:
    case 3:
      return <b>{distance}m </b>;
    case 4:
    case 5:
      return <b>{parseFloat((distance / 1000).toFixed(2))} km </b>;
    default:
      return <b>...</b>;
  }
};

export default ShowDistance;

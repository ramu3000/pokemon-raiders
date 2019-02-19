import React from "react";
import { GymsContext } from "../providers/GymsProvider";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withGyms = Component => {
  const WrappedComponent = props => {
    return (
      <GymsContext.Consumer>
        {gyms => <Component gyms={gyms} {...props} />}
      </GymsContext.Consumer>
    );
  };
  WrappedComponent.displayName = `WithGyms(${getDisplayName(
    WrappedComponent
  )})`;
  return WrappedComponent;
};

export default withGyms;

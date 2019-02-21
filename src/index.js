import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./layouts/App";
import * as serviceWorker from "./serviceWorker";
import GymsProvider from "./components/providers/GymsProvider";
import RaidsProvider from "./components/providers/RaidsProvider";
import LocationProvider from "./components/providers/LocationProvider";

ReactDOM.render(
  <LocationProvider>
    <GymsProvider>
      <RaidsProvider>
        <App />
      </RaidsProvider>
    </GymsProvider>
  </LocationProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

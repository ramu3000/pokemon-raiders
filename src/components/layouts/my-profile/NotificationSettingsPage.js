import React from "react";
import { Input, Button, Snackbar } from "@material-ui/core";
import Toggle from "./../../common/form/ToggleSwitch";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { firestore } from "../../../firebase";
import { urlBase64ToUint8Array } from "../../../utils/pwa";

class NotificationSettingsPage extends React.Component {
  state = {
    subscription: false,
    snackBarOpen: false
  };
  notificationSupport = false;

  componentDidMount() {
    this.notificationSupport = "Notification" in window;
  }
  //XWCjTUoAOeUn0pbXH1h80WZaLYldZ_plvONTcXmGkSE;

  get subscriptionRef() {
    return firestore.collection("subscriptions");
  }

  checkNotificationPermission() {
    return this.state.subscription || Notification.permission === "granted";
  }
  checkNotificationBlocked() {
    return Notification.permission === "denied";
  }

  handleSubscription = () => {
    if ("Notification" in window) {
      Notification.requestPermission(result => {
        console.log("user choice", result);
        if (result !== "granted") {
          this.setState({ subscription: false });
          console.log("No notificaiton permission granted!");
        } else {
          this.setState({ subscription: true, snackBarOpen: true });
          //this.displayConfirmication();
          this.configurePushSubs();
        }
      });
    }
  };
  displayConfirmication = () => {
    const options = {
      body: "you will see in here the raids",
      icon: "/icons/app-192x192.png",
      vibrate: [100, 50, 200],
      //tag: "test-notifications",
      badge: "/icons/app-96x96.png",
      //renotify: false,
      actions: [
        { action: "confirm", title: "Okay", icon: "/icons/app-96x96.png" },
        { action: "cancel", title: "Canceö", icon: "/icons/app-96x96.png" }
      ]
    };
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function(swReg) {
        console.log(swReg);
        swReg.showNotification("Subsescully subscribed via sw", options);
      });
    } else {
      new Notification("Subsescully subscribed", options);
    }
  };

  configurePushSubs() {
    if (!("serviceWorker" in navigator)) return false;

    let reg;
    navigator.serviceWorker.ready
      .then(swReg => {
        reg = swReg;
        return swReg.pushManager.getSubscription();
      })
      .then(sub => {
        console.log("sub", sub);
        if (sub === null) {
          console.log(reg);
          //new subscription
          const vapidPublicKey =
            "BNR5R60QZv6Eg7Q2I_sRs-KbSskxwNT8_iYl6b1mqBu19SHfmNlQihXDjvkOAsqRwPp1aojtbD_TNPIjZ4j1JOg";
          const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
          console.log("convertedVapidPublicKey", convertedVapidPublicKey);
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          });
        } else {
          //we have a subscription
          console.log("subscription already got", sub);
        }
      })
      .then(newSub => {
        console.log("newsub", newSub);
        return this.subscriptionRef.add(newSub);
      })
      .then(res => {
        if (res.ok) {
          this.displayConfirmication();
        }
        console.log(res);
      })
      .catch(err => {
        console.log("error subscribtion", err);
      });
  }

  handleSnackbarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  render() {
    return (
      <section>
        <h3 style={{ marginTop: "20px" }}>Subscription</h3>

        <Toggle
          checked={this.checkNotificationPermission()}
          handleChange={this.handleSubscription}
          value={"subscription"}
          color="primary"
          labelTxt="Subscription"
          disabled={!this.notificationSupport}
        />
        {this.checkNotificationBlocked() && (
          <div>
            <p>
              You have blocked notifications, visit help page for more
              information
            </p>
          </div>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Subscription granted!</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleSnackbarClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </section>
    );
  }
}

export default NotificationSettingsPage;

import React from "react";
import { Button, Input } from "@material-ui/core";
import { Link, navigate } from "@reach/router";

import firebase, { firestore } from "../firebase";
import { collectIdsAndDocsWithDate, collectRaidInfoPage } from "../utils";
import { getUserChatName } from "../utils/localstorage";
import { LocationContext } from "../components/providers/LocationProvider";
import Comments from "../components/Comments";
import "./RaidPage.scss";
class RaidPage extends React.Component {
  state = {
    raid: null,
    comments: [],
    uid: null,
    user: null,
    interested: false
  };
  get raidId() {
    return this.props.id;
  }

  get postRef() {
    return firestore.doc(`raids/${this.raidId}`);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromRaids = null;
  unsubscribeFromComments = null;

  componentDidMount() {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
      const raid = collectRaidInfoPage(snapshot);
      this.setState({ raid });
    });
    this.unsubscribeFromComments = this.commentsRef
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        const comments = [...this.state.comments];
        changes.forEach(change => {
          switch (change.type) {
            case "added":
              comments.splice(
                change.newIndex,
                0,
                collectIdsAndDocsWithDate(change.doc)
              );
              break;

            default:
              break;
          }
        });
        this.setState({ comments });
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromComments();
    this.unsubscribeFromPost();
  }

  getUser() {
    const user = getUserChatName();
    this.setState({ user });
    return user;
  }

  createComment = comment => {
    const user = this.state.user ? this.state.user : this.getUser();
    console.log("user: " + user);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.commentsRef.add({ ...comment, user, timestamp });
  };

  renderDistance(location) {
    if (!location) return <span>where are you at?</span>;
    if (location) {
      const { latitude, longitude } = location;
      // const a = addDistanceToGyms(this.state.raid, {
      //   latitude,
      //   longitude
      // });
    }
  }

  render() {
    if (!this.state.raid) {
      return null;
    }
    const { boss } = this.state.raid;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Home
        </Button>

        <div className="gym graphics">
          <div className="gym--triangle" />
          <div className="gym--boss"> {boss || "Pokemon not known"} </div>
          <LocationContext.Consumer>
            {context => (
              <div className="gym--distance">
                Distance: {this.renderDistance(context)}{" "}
              </div>
            )}
          </LocationContext.Consumer>
        </div>

        <div>Ending time: </div>
        <div className="gym--actions">
          <Button variant="contained">interested</Button>
        </div>
        <div className="chat-wrapper">
          <SmallModalInput
            save={() => alert("saving")}
            question="add your display name"
            buttonTxt="add name"
            buttonSaveTxt="Save"
          />

          <Comments
            comments={this.state.comments}
            onCreate={this.createComment}
          />
        </div>
      </div>
    );
  }
}

const SmallModalInput = ({ save, question, buttonTxt, buttonSaveTxt }) => {
  return (
    <div
      style={{ display: "none" }}
      header="trololo"
      trigger={<Button waves="light">{buttonTxt}</Button>}
    >
      <p>{question}</p>
      <Input type="txt" />
      <Button variant="contained" onClick={save}>
        {buttonSaveTxt}
      </Button>
    </div>
  );
};

export default RaidPage;

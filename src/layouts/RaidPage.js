import React from "react";
import { Button } from "react-materialize";
import { Link, navigate } from "@reach/router";
import firebase, { firestore } from "../firebase";
import {
  collectIdsAndDocsWithDate,
  collectRaidInfoPage,
  addDistanceToGyms,
  getRandomInt
} from "../utils";
import { LocationContext } from "../components/providers/LocationProvider";
import Comments from "../components/Comments";
import "./RaidPage.scss";
class RaidPage extends React.Component {
  state = {
    raid: null,
    comments: [],
    uid: null,
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
        const comments = snapshot.docs.map(collectIdsAndDocsWithDate);
        this.setState({ comments });
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromComments();
    this.unsubscribeFromPost();
  }

  createComment = comment => {
    //TODO USERNAME
    const user = "Anymous";
    const date = new Date();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.commentsRef.add({ ...comment, user, date, timestamp });
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
        <Button onClick={() => navigate("/")}>Home</Button>

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
          <Button>interested</Button>
        </div>
        <div className="chat-wrapper">
          <Comments
            comments={this.state.comments}
            onCreate={this.createComment}
          />
        </div>
      </div>
    );
  }
}
export default RaidPage;

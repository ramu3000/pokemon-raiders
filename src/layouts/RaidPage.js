import React from "react";
import { Button } from "react-materialize";
import { Link } from "@reach/router";
import { firestore } from "../firebase";
import { collectIdsAndDocs, collectRaidInfoPage } from "../utils";
import Comments from "../components/Comments";

class RaidPage extends React.Component {
  state = {
    raid: null,
    comments: []
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
    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromComments();
    this.unsubscribeFromPost();
  }

  createComment = comment => {
    //TODO USERNAME
    const user = "";
    this.commentsRef.add({ ...comment, user });
  };

  render() {
    console.log("raid", this.state.raid);
    if (!this.state.raid) {
      return null;
    }
    const { boss } = this.state.raid;

    return (
      <div>
        <Button>
          <Link to="/">Back</Link>
        </Button>

        <div className="gym graphics">
          <div>Pokemon: {boss || "not known"} </div>
          <div>Distance: </div>
        </div>

        <div>Ending time: </div>
        <div>Help </div>
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

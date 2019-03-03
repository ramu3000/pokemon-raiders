import firebase, { firestore } from "../firebase";
import { navigate } from "@reach/router";
class Firebase {
  constructor() {
    this.db = firestore;
  }

  get gyms() {
    return this.db.collection("gyms").get();
  }

  get raids() {
    return this.db.collection("raids").get();
  }

  async saveRaid(raid) {
    //require fields
    if (!raid.startTime || !raid.endTime || !raid.registeredTime) {
      console.error("required fields are missing, could not save", raid);
      return false;
    }

    const gymReference = await this.db.collection("gyms").doc(raid.gym);
    // added: time, boss, endtime, gym, level, playerque, startime.
    const raidData = {
      added: raid.registeredTime,
      boss: raid.boss ? raid.boss : null,
      endtime: raid.endTime,
      gym: gymReference,
      level: raid.difficulty,
      playerque: raid.playerque ? raid.playerque : 0,
      starttime: raid.startTime,
      gymData: raid.gymData,
      comments: 0
    };

    this.db
      .collection("raids")
      .add(raidData)
      .then(function(docRef, cb) {
        console.log("Document written with ID: ", docRef.id);
        navigate(`/raid/${docRef.id}`);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}

export default new Firebase();

import firebase, { firestore } from "../firebase";

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
    console.log("saving raid", raid);
    const raidData = {
      added: raid.registeredTime,
      boss: raid.boss ? raid.boss : null,
      endtime: raid.endTime,
      gym: gymReference,
      level: raid.difficulty,
      playerque: raid.playerque ? raid.playerque : 0,
      starttime: raid.startTime,
      gymData: raid.gymData
    };

    this.db
      .collection("raids")
      .add(raidData)
      .then(function(docRef, cb) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  async getRaids() {
    const querySnapshot = await this.raids;
    const raids = [];
    querySnapshot.forEach(raid => {
      const data = raid.data();
      const date = data.endtime.toDate();
      const datestart = data.starttime.toDate();
      raids.push({
        id: raid.id,
        boss: data.boss,
        gym: data.gym.id,
        level: data.level,
        playerQue: data.playerQue,
        endTime: date,
        startTime: datestart
      });
    });
    return raids;
  }

  async getGyms() {
    const querySnapshot = await this.gyms;
    const gyms = [];
    querySnapshot.forEach(gym => {
      const data = gym.data();
      gyms.push({
        id: gym.id,
        name: data.name,
        coords: data.coords
      });
    });
    return gyms;
  }
}

export default new Firebase();

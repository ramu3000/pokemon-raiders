import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseConfig } from "./config";
firebase.initializeApp(FirebaseConfig);

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firebase;

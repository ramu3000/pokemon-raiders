const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.incrementCommentCount = functions.firestore
  .document("raids/{raidId}/comments/{commentId}")
  .onCreate(async (snapshot, context) => {
    const { raidId } = context.params;
    const raidRef = firestore.doc(`raids/${raidId}`);
    const snap = await raidRef.get("comments");
    const comments = snap.get("comments");
    return raidRef.update({ comments: comments + 1 });
  });

import firebase from "firebase/app";
// Required for side-effects
import "firebase/firestore";

let app: firebase.app.App;

function getApp() {
  if (!firebase.apps.length) {
    // Initialize Cloud Firestore through Firebase
    app = firebase.initializeApp({
      apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
      authDomain: "included-m.firebaseapp.com",
      projectId: "included-m",
    });
  }

  return app;
}

const db = firebase.firestore(getApp());

export default db;

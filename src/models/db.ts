import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";

if (!firebase.apps.length) {
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
    authDomain: "included-m.firebaseapp.com",
    projectId: "included-m",
  });
}

const db = firebase.firestore();

export default db;

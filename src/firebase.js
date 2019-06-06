import * as firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyD1UlbXJ_epEeoxGZwAwOCBmOjl7fn9hs8",
  authDomain: "vergeet-niet.firebaseapp.com",
  databaseURL: "https://vergeet-niet.firebaseio.com",
  projectId: "vergeet-niet",
  storageBucket: "",
  messagingSenderId: "691982104442",
  appId: "1:691982104442:web:3ae9ccd8096cd9cc"
};
firebase.initializeApp(config);
export default firebase;

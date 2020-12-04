import firebase from "firebase/app"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyDw_KpzmTnlhuekTqy-uimV9YRO1_ZlIb8",
    authDomain: "philanthropy-connect.firebaseapp.com",
    databaseURL: "https://philanthropy-connect.firebaseio.com",
    projectId: "philanthropy-connect",
    storageBucket: "philanthropy-connect.appspot.com",
    messagingSenderId: "468368677937",
    appId: "1:468368677937:web:37a6ff04b377434d008910",
    measurementId: "G-JQKPX8C949"
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export const FBAuth = new firebase.auth.FacebookAuthProvider();
export const GoogleAuth = new firebase.auth.GoogleAuthProvider();
export const AppleAuth = new firebase.auth.OAuthProvider('apple.com');

export default db;
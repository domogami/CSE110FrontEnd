import firebase from "firebase"

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

export const provider2 = new firebase.auth.GoogleAuthProvider()

export default db;
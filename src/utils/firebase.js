/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCb_L74IZvgUD-ov6dUqjhE6MbmRg0rK8g",
    authDomain: "footprint-bcbb6.firebaseapp.com",
    projectId: "footprint-bcbb6",
    storageBucket: "footprint-bcbb6.appspot.com",
    messagingSenderId: "344357908957",
    appId: "1:344357908957:android:54aeaac5351aeb18054634"
};
// Initialize Firebase
!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app()
firebase.firestore().settings({ experimentalForceLongPolling: true }); 

const db=firebase.firestore()
var connectedRef = firebase.database().ref(".info/connected");

        connectedRef.on("value", function(snap) {
           if (snap.val() === true) {
              console.log("connected");
           } else {
              console.log("not connected");
           }
        });


export {firebase,db}

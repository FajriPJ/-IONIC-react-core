import { toast } from "./components/toast";
import firebase from 'firebase'
require('firebase/auth')

export let firebaseConfig:any = {
  apiKey: "AIzaSyDmMWV0ZMwGqthdt2Er7xHU88jCsXT_yMs",
  authDomain: "ionic-project-7548a.firebaseapp.com",
  databaseURL: "https://ionic-project-7548a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ionic-project-7548a",
  storageBucket: "ionic-project-7548a.appspot.com",
  messagingSenderId: "113834433897",
  appId: "1:113834433897:web:174eb22deb414ce8b471f8",
  measurementId: "G-Q53NZBC6W1"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth()
export const database = firebase.firestore()

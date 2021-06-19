
import { toast } from "./toast";

import firebase from 'firebase'
require('firebase/auth')

var firebaseConfig = {
  apiKey: "AIzaSyDmMWV0ZMwGqthdt2Er7xHU88jCsXT_yMs",
  authDomain: "ionic-project-7548a.firebaseapp.com",
  projectId: "ionic-project-7548a",
  storageBucket: "ionic-project-7548a.appspot.com",
  messagingSenderId: "113834433897",
  appId: "1:113834433897:web:174eb22deb414ce8b471f8",
  measurementId: "G-Q53NZBC6W1"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export async function loginUser(email: string, password: string) {

  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(res)
    return true
  } catch (error) {
    console.log(error)
    toast(error.message, 4000)
    return false
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    
    console.log(res)
    return true
  } catch (error) {
    console.log(error)
    toast(error.message, 4000)
  }
}
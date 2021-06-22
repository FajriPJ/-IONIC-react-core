
import { toast } from "./toast";

import firebase from 'firebase'
require('firebase/auth')

var firebaseConfig = {
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
 
// export async function registerUser(email: string, password: string) {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password)
//     console.log(res)
//     return true
//   } catch (error) {
//     console.log(error)
//     toast(error.message, 4000)
//   }
// }

export async function loginUser(email: string, password: string) {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password)
    console.log(res, 'ini dari login user')
    return true
  } catch (error) {
    console.log(error)
    toast(error.message, 4000)
    return false
  }
}

export const guides = (data:any) => {
  data.map((doc:any) => {
    const guide = doc.data()
    // console.log(guide, '///////////')
    return true
  })
}

export function getCurrentUser() {
  return new Promise ((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(function(user) {
      if (user) {
        // firebase.firestore().collection('users').onSnapshot(snapshot => {
        //   guides(snapshot.docs)
        //   console.log(guides(snapshot.docs), '[][][]')
        // })
        console.log(user, '++++')
        resolve(user)
      } else {
        resolve(null)
      }
      unsubscribe()
    }) 
  })
}

export function logOutUser() {
  return firebase.auth().signOut()
}
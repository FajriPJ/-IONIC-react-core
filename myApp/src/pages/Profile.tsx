import ExploreContainer from "../components/ExploreContainer";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonAvatar,
  IonRow,
  IonCol,
  IonButtons,
  IonModal,
  IonInput,
  IonList,
  
} from "@ionic/react";
import { calendarNumber, mailOpen, person, call } from "ionicons/icons";
import { logOutUser } from "../firebaseConfig";
import { useHistory, Link } from "react-router-dom";
import { auth, database } from "../firebaseConfig";
import { toast } from "../components/toast";

import firebase from "firebase";
require("firebase/auth");


const Profile: React.FC = () => {
  const history = useHistory();
  const [usersData, setUsersData] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
 
  const [updateName, setUpdateName] = useState("")
  const [updateBirthdate, setUpdateBirthdate] = useState("")
  const [updatePhone, setUpdatePhone] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              setUsersData({
                id: user.uid,
                name: doc.data()?.name,
                phoneNumber: doc.data()?.phoneNumber,
                photoURL: user.photoURL,
                email: user.email,
                birthdate: doc.data()?.birthdate,
              });
            },
            (error) => {
              setUsersData({
                users: [],
              });
            }
          );
      }
      return unsubscribe;
    });
  }, []);

  function handleLogout(e: any) {
    e.preventDefault();
    logOutUser();
    history.push("./login");
  }

  function handleUpdate(e: any) {
    console.log('asfasdfasd')
    const user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
      uid = user.uid;
      const db = firebase.firestore();
      const docRef = db.collection('users')
      .doc(uid)
      .update({
        name: updateName,
        birthdate: updateBirthdate,
        phoneNumber: updatePhone
      })
      .then(() => {
        toast("Profile Successfully Edited!");
        console.log('Profile Successfully Edited!');
      }).catch((error) => {
        console.log('Error updating the document:', error);
      })
    }
    setShowModal(false); 
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={(e) => handleLogout(e)} color="danger">
              Sign Out
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center vertical-center">
        <IonAvatar ion-padding className="avatar item-avatar">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonCard ion-margin>
          <IonItem href="#" className="ion-activated">
            <IonIcon icon={mailOpen} slot="start" />
            <IonLabel>
              {usersData.email}</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={person} slot="start" />
            {
              usersData.name ? (
                <IonLabel>{usersData.name}</IonLabel>) : (<IonLabel>Your name</IonLabel>
              )
            }
          </IonItem>

          <IonItem href="#">
            <IonIcon icon={calendarNumber} slot="start"></IonIcon>
              {
                usersData.birthdate ? (
                  <IonLabel>{usersData.birthdate}</IonLabel>) : (<IonLabel>Your birthdate</IonLabel>
                )
              }
          </IonItem>

          <IonItem href="#">
            <IonIcon icon={call} slot="start"></IonIcon>
              {
                usersData.phoneNumber ? (
                  <IonLabel>{usersData.phoneNumber}</IonLabel>) : (<IonLabel>Your phone number</IonLabel>
                )
              }
          </IonItem>

        </IonCard>
        <IonButton
          className="edit-button"
          ion-padding
          shape="round"
          onClick={() => setShowModal(true)}
          // onClick={handleUpdate}
        >
          Update Profile
        </IonButton>

        <IonModal isOpen={showModal} cssClass="my-custom-class ">
          <IonList className="ion-padding">
            <div className="title">
              <h2>Update Your Profile</h2>
            </div>
            <IonItem>
              <IonLabel position="floating">your name</IonLabel>
              <IonInput 
                onIonChange={(e: any) => setUpdateName(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">your Phone Number</IonLabel>
              <IonInput 
                onIonChange={(e: any) => setUpdatePhone(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel></IonLabel>
              <IonInput 
                type="date" 
                onIonChange={(e: any) => setUpdateBirthdate(e.target.value)}
                />
            </IonItem>
            <IonButton ion-padding onClick={handleUpdate}>Update Profile</IonButton>
          </IonList>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

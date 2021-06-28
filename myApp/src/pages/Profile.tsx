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
  IonGrid,
} from "@ionic/react";
import { calendarNumber, mailOpen, person, call } from "ionicons/icons";
import { useHistory, Link } from "react-router-dom";
import { auth, database } from "../firebaseConfig";
import { toast } from "../components/toast";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/actions/authAction";
import { RootStore } from "../store";
import firebase from "firebase";
require("firebase/auth");

const Profile: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [usersData, setUsersData] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updateBirthdate, setUpdateBirthdate] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");

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
    dispatch(signOut());
    history.push("./register");
  }

  function handleUpdate(e: any) {
    console.log("asfasdfasd");
    const user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
      uid = user.uid;
      database
        .collection("users")
        .doc(uid)
        .update({
          name: updateName,
          birthdate: updateBirthdate,
          phoneNumber: updatePhone,
        })
        .then(() => {
          toast("Profile Successfully Edited!");
          console.log("Profile Successfully Edited!");
        })
        .catch((error) => {
          console.log("Error updating the document:", error);
        });
    }
    setShowModal(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center vertical-center">
        <div className="header">
          <div className="space-between">
            <h4>Profile</h4>
            <IonButtons slot="primary">
            <IonButton
              type="submit"
              onClick={(e) => handleLogout(e)}
              color="danger"
            >
              Sign Out
            </IonButton>
          </IonButtons>
          </div>
        </div>

        <div className="avatar">
          <IonAvatar ion-padding className="item-avatar">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
        </div>
        <IonItem className="ion-activated">
          <IonIcon icon={mailOpen} slot="start" />
          <IonLabel>{usersData.email}</IonLabel>
        </IonItem>

        <IonItem className="ion-activated">
          <IonIcon icon={person} slot="start" />
          {usersData.name ? (
            <IonLabel>{usersData.name}</IonLabel>
          ) : (
            <IonLabel>Your name</IonLabel>
          )}
        </IonItem>

        <IonItem className="ion-activated">
          <IonIcon icon={calendarNumber} slot="start"></IonIcon>
          {usersData.birthdate ? (
            <IonLabel>{usersData.birthdate}</IonLabel>
          ) : (
            <IonLabel>Your birthdate</IonLabel>
          )}
        </IonItem>

        <IonItem className="ion-activated">
          <IonIcon icon={call} slot="start"></IonIcon>
          {usersData.phoneNumber ? (
            <IonLabel>{usersData.phoneNumber}</IonLabel>
          ) : (
            <IonLabel>Your phone number</IonLabel>
          )}
        </IonItem>
        <IonButton
          className="edit-button"
          expand= "block"
          style={{marginTop: "20px"}}
          shape="round"
          onClick={() => setShowModal(true)}
        >
          Update Profile
        </IonButton>

        <IonModal isOpen={showModal}>
          <IonContent>
            <IonGrid>
              <IonRow>
                <form id="form">
                  <h2>Update your profile</h2>
                  <IonItem ion-padding>
                    <IonLabel position="floating">your name</IonLabel>
                    <IonInput
                      ion-padding
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
                      onIonChange={(e: any) =>
                        setUpdateBirthdate(e.target.value)
                      }
                    />
                  </IonItem>
                  <IonGrid>
                    <IonRow>
                      <IonCol size-sm="6" size="6" class="ion-text-center">
                        <IonButton
                          expand="full"
                          class="ion-text-wrap min-max-width"
                          onClick={handleUpdate}
                          shape="round"
                        >
                          Update
                        </IonButton>
                      </IonCol>

                      <IonCol size-sm="6" size="6" class="ion-text-center">
                        <IonButton
                          expand="full"
                          color="danger"
                          shape="round"
                          class="ion-text-wrap min-max-width"
                          onClick={() => setShowModal(false)}
                        >
                          cancel
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

import ExploreContainer from "../components/ExploreContainer";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonButton,
} from "@ionic/react";
import { Link, useHistory} from "react-router-dom";
import "./Register.css";
import { toast } from "../components/toast";
import { auth, database } from "../firebaseConfig";
import { SplashScreen } from "@capacitor/splash-screen";

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  
  const history = useHistory()

  async function handleRegister() {
    setBusy(true);
    
    if (password !== rPassword) {
      toast("password not match");
    }
    if (email?.trim() === "" || password?.trim() === "") {
      return toast("email and password are required");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        toast("you have registered succesfully");
        return database.collection("users").doc(credential.user?.uid).set({
          name:  credential.user?.photoURL,
          email,
          birthdate,
          photoURL: credential.user?.photoURL,
          phoneNumber: credential.user?.phoneNumber
        });
      })
      .catch((err) => {
        toast(err.message, 4000);
      });
    setBusy(false);
    history.push('/')
  }

  return (
    <IonPage>
      <IonLoading message="please wait..." duration={2} isOpen={busy} />
      <IonContent className="ion-padding ion-text-center vertical-center">
        <div className="title">
          <h2>Create an Account</h2>
        </div>
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput onIonChange={(e: any) => setEmail(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Repeat Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setRPassword(e.target.value)}
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleRegister}
            className="shadow-button ion-padding"
          >
            Register
          </IonButton>
        </IonList>
        <p ion-padding>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;

import ExploreContainer from "../components/ExploreContainer";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonGrid,
  IonRow,
  IonIcon,
  IonLoading,
  IonButton,
} from "@ionic/react";
import { key, mail, lockClosed } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { toast } from "../components/toast";
import { auth, database } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { signUp } from "../store/actions/authAction";

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  async function handleRegister() {
    setBusy(true);

    if (password !== rPassword) {
      toast("password not match");
    }
    if (email?.trim() === "" || password?.trim() === "") {
      return toast("email and password are required");
    }
    dispatch(signUp({email: email,password: password}))
    setBusy(false);
    history.push("/");
  }

  return (
    <IonPage>
      <IonLoading message="please wait..." duration={2} isOpen={busy} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <div id="header">
              <h1>Create New Account</h1>
            </div>
            <form id="form">
              <IonItem class="ion-margin-bottom">
                <IonLabel position="floating">
                  <IonIcon icon={mail} slot="start" ></IonIcon>
                  <span className="text">email</span>
                </IonLabel>
                <IonInput onIonChange={(e: any) => setEmail(e.target.value)} />
              </IonItem>
              <IonItem class="ion-margin-bottom">
                <IonLabel position="floating">
                  <IonIcon icon={lockClosed} slot="start"/>password
                </IonLabel>
                <IonInput
                  type="password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating"> <IonIcon icon={lockClosed} slot="start" />confirm password</IonLabel>
                <IonInput
                  type="password"
                  onIonChange={(e: any) => setRPassword(e.target.value)}
                />
              </IonItem>
              <IonButton expand="block" onClick={handleRegister}>
                Register
              </IonButton>
            </form>
            <p>
            Already have an account? <Link to="/Login">Login</Link>
            </p>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;

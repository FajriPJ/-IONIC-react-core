import ExploreContainer from "../components/ExploreContainer";
import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonLoading,
  IonIcon
} from "@ionic/react";
import { key, mail } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../firebaseConfig";
import { toast } from "../components/toast";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);

  async function handleLogin() {
    setBusy(true);
    const res = await loginUser(email, password);
    if (res) {
      toast("you have logged in successfully");
      history.push("/");
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonLoading message="please wait..." duration={2} isOpen={busy} />

      <IonContent className="ion-padding ion-text-center vertical-center">
        <div className="title">
          <h2>Welcome</h2>
        </div>
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating"><IonIcon icon={mail} slot="start"/></IonLabel>
            <IonInput onIonChange={(e: any) => setEmail(e.target.value)} />
          </IonItem>
          <IonItem>
            
            <IonLabel position="floating"><IonIcon icon={key} slot="start"/>  </IonLabel>
            <IonInput
              style={{ borderRadius: "50%" }}
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleLogin}
            className="shadow-button ion-padding"
          >
            Login
          </IonButton>
        </IonList>
        <p ion-padding>
          New Here? <Link to="/register">Register</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;

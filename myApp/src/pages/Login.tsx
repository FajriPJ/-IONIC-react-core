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
  IonButtons,
  IonLoading,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { key, mail } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { toast } from "../components/toast";
import { useDispatch  } from "react-redux";
import { signIn } from "../store/actions/authAction";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);

  async function handleLogin(e: any) {
    e.preventDefault()
    setBusy(true);
    dispatch(signIn({email: email,password: password}))
    // history.push("/");
    setBusy(false);
  }

  return (
    <IonPage>
      <IonLoading message="please wait..." duration={2} isOpen={busy} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <div id="header">
              <h1>Welcome</h1>
            </div>

            <form id="form" onSubmit={(e) => handleLogin(e)}>
              <IonItem class="ion-margin-bottom">
                <IonLabel position="floating">
                  <IonIcon icon={mail} slot="start" /> email
                </IonLabel>
                <IonInput  onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
              </IonItem>
              <IonItem class="ion-margin-bottom">
                <IonLabel position="floating">
                  <IonIcon icon={key} slot="start" /> password
                </IonLabel>
                <IonInput type="password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
              </IonItem>
              <IonButton type="submit" expand="block" >
                Login
              </IonButton>
            </form>
            <p>
              New Here?
                <Link to="/register"> Register</Link>
            </p>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;

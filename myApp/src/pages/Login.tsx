import ExploreContainer from '../components/ExploreContainer';
import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonButton,
  IonLoading
} from '@ionic/react';
import { Link } from 'react-router-dom';
import './Tab2.css';
import { loginUser } from '../firebaseConfig';
import { toast } from '../toast'

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState<boolean>(false)

  async function handleLogin() {
    setBusy(true)

    const res = await loginUser(email, password)
    if (res) {
      toast('you have logged in successfully')
    }
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message= "please wait..." duration={2} isOpen={busy}/>
      <IonContent fullscreen>
        <IonList className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput 
              onIonChange={(e: any) => setEmail(e.target.value)}
              />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
              />
          </IonItem>
          <IonButton 
            onClick={handleLogin}
            className="ion-padding">
            Login
          </IonButton>
          <p >
            New Here? <Link to='/register'>Register</Link> 
          </p>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;

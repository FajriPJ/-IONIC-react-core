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
  IonItemDivider,
  IonLoading,
  IonButton
} from '@ionic/react';
import { Link } from 'react-router-dom';
import './Tab1.css';
import { toast } from '../toast';
import { registerUser } from '../firebaseConfig'

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  async function handleRegister() {
    setBusy(true)

    if (password !== rPassword) {
      toast('password not match')
    }
    if ( email?.trim() === '' || password?.trim() === '' ) {
      return toast('email and password are required')
    }
    const res = await registerUser(email, password)
    if (res) {
      toast('you have registered succesfully')
    } 
    
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
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
          <IonItem>
            <IonLabel position="floating">Repeat Password</IonLabel>
            <IonInput 
              type="password"
              onIonChange={(e: any) => setRPassword(e.target.value)}
              />
          </IonItem>
          <IonButton 
            onClick={handleRegister}
            className="ion-padding">
            Register
          </IonButton>
          <p >
            Already have an account? <Link to='/Login'>Login</Link> 
          </p>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Register;

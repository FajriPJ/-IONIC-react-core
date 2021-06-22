import React, {useState, useEffect} from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { getCurrentUser } from './firebaseConfig'

const RouteGuard: React.FC = () =>   {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/register" component={Register} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/" component={Profile} exact/>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        if (user) {
          window.history.replaceState({}, '', '/' )
        } else {
          window.history.replaceState({}, '', '/login')
        }
        setBusy(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <IonApp>
      {
      busy ? 
        <div className="spin">
          <IonSpinner duration={5} color="tertiary" name="bubbles"/> 
        </div>
        : 
        <RouteGuard/>}
    </IonApp>
  )
}

 
export default App;

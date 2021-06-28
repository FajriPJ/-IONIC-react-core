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
import { getUserById } from './store/actions/authAction';
import { useDispatch } from 'react-redux';
import { auth } from './firebaseConfig';
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

  const dispatch = useDispatch()
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        console.log(user, '[][][')
        await dispatch(getUserById(user.uid));
        window.history.replaceState({}, '', '/' )
      } else {
        window.history.replaceState({}, '', '/register')
      }
      setBusy(false)
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);


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

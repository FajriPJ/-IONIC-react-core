import { applyMiddleware, createStore, compose } from 'redux'
import Reducer from './reducers' 
import thunk from 'redux-thunk'
import {firebaseConfig} from '../firebaseConfig'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  Reducer, 
  composeWithDevTools(applyMiddleware(thunk))
)
  
export type RootStore = ReturnType <typeof Reducer>
export default store;
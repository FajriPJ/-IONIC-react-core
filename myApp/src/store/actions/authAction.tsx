import { Dispatch } from "redux";
import {  auth, database } from "../../firebaseConfig";
import {RootStore} from "../"
import { ThunkAction } from "redux-thunk"
import {AuthDispatchTypes, User, SigninData, SET_USER, SIGN_OUT, signUpData} from "../actions/authType"
import { toast } from "../../components/toast";


export const signUp = (data: signUpData): ThunkAction<void, RootStore, null, AuthDispatchTypes> => {
  return async dispatch => {
    try {
      const res = await auth.createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          photoURL: res.user.photoURL,
          birthDate: new Date(),
          id: res.user.uid
        }
        await database.collection('users').doc(res.user.uid).set(userData)
        dispatch({
          type: SET_USER,
          payload: userData
        });
        toast("you have registered succesfully");
      }
    } catch (error) {
      toast(error.message, 4000)
      console.log(error);
    }
  }
}


export const signIn = (data:SigninData): ThunkAction<void, RootStore, null, AuthDispatchTypes> => {
  return async dispatch => {
    try {
      const res = await auth.signInWithEmailAndPassword(data.email, data.password)
      if (res) {
        toast("you have logged in successfully");
      }
      console.log(data.email, data.password, data)

    } catch (error) {
      toast(error.message, 4000)
      console.log(error);
    }
  }
  // export async function loginUser(email: string, password: string) {
  //   try {
  //     const res = await auth.signInWithEmailAndPassword(email, password)
  //     console.log(res, 'ini dari login user')
  //     return true
  //   } catch (error) {
  //     console.log(error)
  //     toast(error.message, 4000)
  //     return false
  //   }
  // }
}

export const getUserById = (id: string): ThunkAction<void, RootStore, null, AuthDispatchTypes> => {
  return async dispatch => {
    try {
      const user = await database.collection('users').doc(id).get();
      if(user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (error) {
      toast(error.message, 4000)
    }
  }
}


export const signOut = (): ThunkAction<void, RootStore, null, AuthDispatchTypes> => {
  return async dispatch => {
    try {
      await auth.signOut()
      dispatch({type: SIGN_OUT})
    } catch (error) {
      toast(error.message, 4000)
      console.log(error)
    }
  }
}
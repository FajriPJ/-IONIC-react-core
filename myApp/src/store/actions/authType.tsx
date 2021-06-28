export const SET_USER = 'SET_USER' 
export const SIGN_OUT = 'SIGN_OUT';
export const SET_SUCCESS = 'SET_SUCCESS';

export interface User {
  name: string | null,
  phoneNumber: string| null,
  email: string | null,
  photoURL: string | null,
  birthDate: Date | null,
  id: string | null
}

export interface AuthState {
  user: User | null
}

export interface signUpData {
  email: string,
  password: string,
  // name: string, 
  // phoneNumber: string,
  // photoURL: string,
  // birthDate: string
}

export interface SigninData {
  email:string,
  password: string
}

interface SetUserAction {
  type: typeof SET_USER,
  payload: User
}

interface SignOutAction {
  type: typeof SIGN_OUT
}

interface SetSucessAction {
  type: typeof SET_SUCCESS,
  payload: string;
}

// export interface signoutSuccess {
//   type: typeof SIGN_OUT
// }

// export type UserType = {
//   articles: userDataType[]
// }

// export type userDataType = {
//   name: string,
//   email: string,
//   photoURL: string,
//   phoneNumber: string
// }



export type AuthDispatchTypes = SetUserAction | SignOutAction | SetSucessAction
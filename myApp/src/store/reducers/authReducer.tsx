import { AuthDispatchTypes, AuthState, SET_USER, SET_SUCCESS, SIGN_OUT } from "../actions/authType";


const initialState: AuthState = {
  user: null
}

const authReducer = (state = initialState, action: AuthDispatchTypes) => {
  switch (action.type) {
    case SET_USER:
      return {
      ...state,
      user: action.payload
    } 
    case SIGN_OUT: 
      return {
        ...state,
        user: null
      }
    case SET_SUCCESS: 
      return {
        ...state, 
        success:action.payload
      }
    default: 
      return state
  }
} 

export default authReducer
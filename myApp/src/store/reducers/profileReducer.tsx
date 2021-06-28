import { ProfileDispatchTypes, ProfileType, PROFILE_FAIL, PROFILE_LOADING, PROFILE_SUCCESS } from '../actions/profileType'

interface profileState {
  loading: boolean,
  profile?: ProfileType
}

const initialState: profileState = {
  loading: false,
}

const newsReducer = (state: profileState = initialState, action: ProfileDispatchTypes) : profileState => {
  switch (action.type) {
    
    case PROFILE_FAIL: return {
      loading: false
    }
    case PROFILE_LOADING: return {
      loading: true,
    }
    case PROFILE_SUCCESS: return {
      loading: false,
      profile: action.payload
    }
    default: 
      return state
  }
} 

export default newsReducer
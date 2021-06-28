export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_FAIL = "PROFILE_FAIL";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";

export type ProfileType = {
  articles: profileDataType[]
}

export type profileDataType = {
  name: string,
  email: string,
  photoURL: string,
  phoneNumber: string
}

export interface ProfileLoading {
  type: typeof PROFILE_LOADING
}
export interface ProfileFail {
  type: typeof PROFILE_FAIL
}
export interface ProfileSuccess {
  type: typeof PROFILE_SUCCESS,
  payload: ProfileType
}

export type ProfileDispatchTypes = ProfileLoading | ProfileFail | ProfileSuccess
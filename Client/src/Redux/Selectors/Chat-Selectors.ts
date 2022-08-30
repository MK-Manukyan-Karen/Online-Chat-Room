
// import { createSelector } from "reselect";
import { AppStateType } from "../Redux-store/Store";

export const getIsJoin = (state: AppStateType)=> {
    return  state.chat.isJoin
}

export const getIsLoading = (state: AppStateType)=> {
    return  state.chat.isLoading
}

export const getRoomName = (state: AppStateType) => {
    return  state.chat.roomName
}

export const getUsers = (state: AppStateType) => {
    return  state.chat.users
}
export const getUsersLength = (state: AppStateType) => {
    return  state.chat.users.length
}

export const getMeID = (state: AppStateType) => {
    return  state.chat.me._id
}

export const getMeAvatar = (state: AppStateType) => {
    return  state.chat.meAvatar
}

export const getServerErrorMessage = (state: AppStateType) => {
    return  state.chat.serverErrorMessage
}

export const getIsServerError = (state: AppStateType) => {
    return  state.chat.isServerError
}
export const getMeName = (state: AppStateType) => {
    return  state.chat.me.userName
}

export const getMessages = (state: AppStateType) => {
    return  state.chat.messages
}

export const getMeData = (state: AppStateType) => {
    return  state.chat.me
}




//for example reselect-selector
// export const getProducts = createSelector(getIsAuth,(isAuth) => {
//       return isAuth
// })
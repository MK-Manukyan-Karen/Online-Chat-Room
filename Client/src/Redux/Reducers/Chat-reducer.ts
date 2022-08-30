
import { ThunkAction } from "redux-thunk";
import { socket } from "../../Socket/Socket";
import { InferActionsTypes, AppStateType } from "../Redux-store/Store";
import { chatAPI } from "../../ChatAPI/chatAPI";
import {RoomType,UserType, MessageType,RoomDataType} from "../../Components/Common/Types/Types";


const SET_IS_JOIN = "ONLINE_CHAT/JOIN/SET_IS_JOIN";
const SET_IS_LOADING = "ONLINE_CHAT/JOIN/SET_IS_LOADING";
const SET_ROOM_ID = "ONLINE_CHAT/JOIN/SET_ROOM_ID";
const SET_ME_DATA = "ONLINE_CHAT/JOIN/SET_ME_DATA";
const SET_USERS = "ONLINE_CHAT/JOIN/SET_USERS";
const SET_MESSAGES = "ONLINE_CHAT/SET_MESSAGES";
const SET_PROFILE_AVATAR = "ONLINE_CHAT/JOIN/SET_PROFILE_AVATAR";
const SET_SERVER_ERROR = "ONLINE_CHAT/JOIN/SET_SERVER_ERROR";
const SET_SERVER_ERROR_MESSAGE = "ONLINE_CHAT/JOIN/SET_SERVER_ERROR_MESSAGE";

export type initialStateType = typeof initialState;

let initialState = {
  isJoin: false,
  roomName: "",
  me: {} as UserType,
  meAvatar: "",
  users: [] as Array<UserType>,
  messages: [] as Array<MessageType>,
  serverErrorMessage: "",
  isServerError: false,
  isLoading: false,
};

export const chatReducer = ( state = initialState,action: ActionsTypes): initialStateType => {
  switch (action.type) {

    case SET_IS_JOIN:
      return {
        ...state,
        isJoin: action.isJoin,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.loading,
      };

    case SET_ME_DATA:
      return {
        ...state,
        me: action.me,
      };
    
    case SET_PROFILE_AVATAR:
      return {
        ...state,
        meAvatar: action.avatar,
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: [...action.messages],
      };

    case SET_ROOM_ID:
      return {
        ...state,
        roomName: action.roomName,
      };

    case SET_SERVER_ERROR:
      return {
        ...state,
        isServerError: action.error,
      };

    case SET_SERVER_ERROR_MESSAGE:
      return {
        ...state,
        serverErrorMessage: action.message,
      };

    default:
      return state;
  }
};

//ActionCreator

export const actions = {
  setIsJoin: (isJoin: boolean) =>
    ({
      type: SET_IS_JOIN,
      isJoin,
    } as const),

  setIsLoading: (loading: boolean) =>
    ({
      type: SET_IS_LOADING,
      loading,
    } as const),

  setRoomName: (roomName: string) =>
    ({
      type: SET_ROOM_ID,
      roomName,
    } as const),

  setMeData: (payload: UserType) =>
    ({
      type: SET_ME_DATA,
      me: payload,
    } as const),


  setProfilAvatar: (avatar: string) =>
    ({
      type: SET_PROFILE_AVATAR,
      avatar,
    } as const),

  setUsers: (payload: Array<UserType>) =>
    ({
      type: SET_USERS,
      users: payload,
    } as const),

  setMessages: (payload: Array<MessageType>) =>
    ({
      type: SET_MESSAGES,
      messages: payload,
    } as const),

  setServerError: (error: boolean) =>
    ({
      type: SET_SERVER_ERROR,
      error,
    } as const),

  setServerErrorMessage: (message: string) =>
    ({
      type: SET_SERVER_ERROR_MESSAGE,
      message,
    } as const),
};

//thunks

export const createRoom = (roomName: string,userName: string,meAvatar: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(actions.setIsLoading(true));
      dispatch(actions.setRoomName(roomName));
      const room: RoomType = await chatAPI.createRoom(roomName,userName,socket.id,meAvatar);
      const {me} = room
      dispatch(actions.setMeData(me));
      socket.emit("ROOM:JOIN", me);
      const RoomData: RoomDataType = await chatAPI.getRoomUsersAndMessages(roomName);
      dispatch(actions.setUsers(RoomData.users));
      dispatch(actions.setMessages(RoomData.messages));
      socket.emit("USER:JOINED",me)
      dispatch(actions.setIsLoading(false));
      dispatch(actions.setIsJoin(true));
    } catch (error) {
      dispatch(actions.setServerErrorMessage( "An error occurred in the server,Please try again"));
      dispatch(actions.setServerError(true));
      dispatch(actions.setIsLoading(false));
    }
  };
};

export const addNewMessage = (newMessage: string,meData: UserType): ThunkType => {
  return async (dispatch) => {
    try {
      const { roomID, _id } = meData;
      socket.emit("NEW-MESSAGE:SEND-MESSAGE", { newMessage, roomID, _id });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLeaveChat = (meData: UserType): ThunkType => {
  return async (dispatch) => {
    try {
      socket.emit("USER:LEAVE-CHAT", meData);
    } catch (error) {
      console.log(error);
    }
  };
};



type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction< Promise<void>, AppStateType, unknown,ActionsTypes>;

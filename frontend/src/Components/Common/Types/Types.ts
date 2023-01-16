
export type MessageType = {
    _id : string
    message : string
    user : UserType
    roomID : string
    userStatusInChat : UserStatusInChatType
    createdAt : string
    updatedAt : string
  } 

  
 export type UserType = {
    _id : string,
    avatarIcon: string
    userName: string
    roomID : string
    socketID: string
  }


export type RoomType = {
  roomID : string
  me : UserType
}

export type RoomDataType = {
  users : Array<UserType>
  messages: Array<MessageType>
}

export type FormDataType = {
  roomName: string;
  userName: string;
};

export type GetDataType = {
  users : Array<UserType>
}


export type UserStatusInChatType = {
  user: UserType,
  status : boolean
}
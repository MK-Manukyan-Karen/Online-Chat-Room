import arm from './arm.json'
import ru from './ru.json'
import en from './en.json'
import flagArm  from '../../../Assets/language-icons/flagArm.png'
import flagRu  from '../../../Assets/language-icons/flagRu.png'
import flagEn  from '../../../Assets/language-icons/flagEn.png'






export type DictionaryListType = {
  chatroom: string
  roomName : string
  userName : string
  textChooseProfileIcon: string
  joinButtonName : string
  roomErrorMessage : string
  minLengthRoomErrorMessage : string
  maxLengthRoomErrorMessage : string
  userNameErrorMessage : string
  minLengthUserNameErrorMessage :string
  maxLengthUserNameErrorMessage : string
}
 


export type DictionaryListLanguageType = {
  arm : DictionaryListType 
  ru : DictionaryListType
  en : DictionaryListType
}

export const dictionaryList:DictionaryListLanguageType = { arm, ru, en }

export type LanguageOptionsType = {
  arm : string
  en : string
  ru : string
}
export const languageOptions:LanguageOptionsType = {
  arm :flagArm,  
  en:flagEn ,
  ru:flagRu,
};



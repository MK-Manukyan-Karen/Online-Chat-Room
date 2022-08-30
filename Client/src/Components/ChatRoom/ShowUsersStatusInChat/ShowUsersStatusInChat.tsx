import React from 'react'
import { useSelector } from 'react-redux'
import { getMeID } from '../../../Redux/Selectors/Chat-Selectors'
import { UserStatusInChatType } from '../../Common/Types/Types'
import style from './ShowUsersStatusInChat.module.css'


const ShowUsersStatusInChat:React.FC<PropsType> = React.memo( ({userStatusInChat}) => {
  const meID = useSelector(getMeID)
  const {status,user} = userStatusInChat
  
  return (
    <React.Fragment>

     { status 
       ? <>
          {meID !== user._id ? <div className = {style.userJoined}>{`${user.userName} : has joined the chat`}  </div> : null}
         </>
       : <div className = {style.userLeaveChat}>{`${user.userName} : has leaves the chat`}</div>
     }
    </React.Fragment>
  )

})

export default ShowUsersStatusInChat

type PropsType = {
  userStatusInChat : UserStatusInChatType
}
import React from 'react'
import style from './ChatHeader.module.css'
import { useSelector } from 'react-redux'
import { getRoomName, getUsersLength } from '../../../Redux/Selectors/Chat-Selectors'



type PropsType = {
   setShowWindowQuestionHandler : (leave : boolean) => void
}

export const ChatHeader:React.FC<PropsType> = ({setShowWindowQuestionHandler}) => {
   

  const usersLength = useSelector(getUsersLength)
  const roomName = useSelector(getRoomName)


  return (
      
    <div className = {style.headerContainer}>
   
       <div className = {style.logo}>MK</div>

       <div className = {style.chatRoomName}>
          <h2>Chat name: {roomName}</h2>
          
         <div className={style.online}>
            <p>Online : {usersLength}</p>
         </div>
       </div>
       <button className = {style.disconnectIcon} onClick = {() => setShowWindowQuestionHandler(true)}></button>
    </div>
  )
}


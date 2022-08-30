import React, { useEffect } from 'react'
import { Message } from './Message/Message'
import style from './ChatMessages.module.css'
import iconRobot from '../../../Assets/message-icons/robot.gif'
import { MessageType } from '../../Common/Types/Types'
import { useScrollToBottom } from '../../Common/Hooks/useScrollToBottom'
import { messageSound } from '../../../Helpers/helpers'

export const ChatMessages:React.FC<PropsType> =React.memo( ({messages,meName}) => {
  
  
  const { scrollHandler, elementEndBottomRef } = useScrollToBottom(messages)

  useEffect( () => {
    messageSound()
  },[messages])


  return (
    <div className = {style.messagesContainer} onScroll = {scrollHandler}>
      <div className={style.messagesWrapper}>
    
      {!messages.length  ? (
        <div className = {style.welcomeWrapper}>
          <p className = {style.welcomeText}>Welcome` <span>{meName}</span></p>
          <div className = {style.iconBody}>
        
           <img src = {iconRobot} alt = 'robot' className={style.robot}/>
           <div className = {style.titleBody}>
           
            <p className = {style.title}>No message yet</p>
          </div>
          </div>
        </div>
      ): messages.map( message => (
                                   <Message message = {message} key = {message._id} 
                                            userStatusInChat = {message.userStatusInChat} />
                                  )
                     ) 
    }
      <div ref = {elementEndBottomRef}/>
      </div>
    </div>
  )
})

type PropsType = {
  messages : Array<MessageType>
  meName : string
}
import React, { useEffect, useState } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import style from './ChatRoom.module.css'
import { InfoBar } from './InfoBar/InfoBar';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatSendMessageForm } from './ChatSendMessageForm/ChatSendMessageForm';
import {Modal } from '../Common/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../Socket/Socket';
import { actions } from '../../Redux/Reducers/Chat-reducer';
import { getMeName, getMessages } from '../../Redux/Selectors/Chat-Selectors';


export const ChatRoom:React.FC = React.memo( () => {

  const [showWindowQuestion, setShowWindowQuestion] = useState(false)
  const messages = useSelector(getMessages)
  const meName = useSelector(getMeName)

 
  const dispatch = useDispatch()

  useEffect( () => {

    socket.on('ROOM:JOINED', ({roomUsers}) => {
       dispatch(actions.setUsers(roomUsers))
    })

    socket.on('USER-JOINED:INFORM-ALL-USERS', (message) => {
      dispatch(actions.setMessages(message) )
    })

    socket.on('MESSAGE:NEW-MESSAGE', (message) => {
      dispatch(actions.setMessages(message) )
    })

    socket.on('SET-ALL-USERS:IN-CHAT', ({roomUsers}) => {
      dispatch(actions.setUsers(roomUsers))
    })
   
  },[])



  const setShowWindowQuestionHandler = (leave : boolean) => {
    setShowWindowQuestion(leave)
  }
 
  return (

    <div className = {style.chatRoomContainer}>
      {
        showWindowQuestion && <Modal setShowModal = {setShowWindowQuestionHandler} />
      }
      
        <ChatHeader setShowWindowQuestionHandler = {setShowWindowQuestionHandler}/>
        <InfoBar />
        <ChatMessages messages={messages} meName = {meName}/>
        <ChatSendMessageForm />
    </div>
  )    

});

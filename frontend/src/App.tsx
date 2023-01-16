import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import "./App.css"

import { ChatRoom } from "./Components/ChatRoom/ChatRoom"
import { Join } from "./Components/Join/Join"
import { getIsJoin, getRoomName } from "./Redux/Selectors/Chat-Selectors";


const App: React.FC = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const isJoin = useSelector(getIsJoin)
  const roomName = useSelector(getRoomName)


  useEffect( () => {

    if(isJoin){
      navigate(`/chatRoomName/:${roomName}`)
    }else{
      navigate('/')
    }
  },[isJoin])


  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={ <Join/> } />
          <Route path="/chatRoomName/:roomName" element={ <ChatRoom/> } />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { motion } from "framer-motion";
import style from "./InfoBar.module.css";

import { RiMenuUnfoldFill } from "react-icons/ri";
import UserInfo from "./UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Selectors/Chat-Selectors";



const animateMenuBar = {
  open: {
    width: "200px",
  },
  closed: {
    width: "70px",
  },
};


export const InfoBar: React.FC = () => {

  const [isShowUserInfo, setIsShowUserInfo] = useState(false);
  const users = useSelector(getUsers)

  return (
    <div className={style.infoBarContainer}>
      <motion.div
        className={style.infoWrapper}
        animate={isShowUserInfo ? "open" : "closed"}
        variants={animateMenuBar}
      >
        <motion.div
          className={style.burger}
          onClick={() => setIsShowUserInfo((isShow) => !isShow)}
          animate={isShowUserInfo ? "open" : "closed"}
          variants={animateMenuBar}
        >
          <RiMenuUnfoldFill />
        </motion.div>

        <div className={style.itemsContainer}>
           {
               users.map( (user) =>  <UserInfo isShowUserInfo = {isShowUserInfo}
                                                     key = {user._id}
                                                     userID = {user._id}
                                                     userName = {user.userName}
                                                     avatarIcon = {user.avatarIcon}
                                                     />
                        )
           } 
         
        </div>

      </motion.div>
    </div>
  );
};

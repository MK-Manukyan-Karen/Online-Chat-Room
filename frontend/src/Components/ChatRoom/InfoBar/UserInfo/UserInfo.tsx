import React from "react";
import { motion } from "framer-motion";
import style from './UserInfo.module.css'
import defaultAvatar from '../../../../Assets/user-icons/defaultIcon.png'
import { getMeID } from "../../../../Redux/Selectors/Chat-Selectors";
import { useSelector } from "react-redux";

const animateItem = {

    hidden: {
      width: "58px",
    },
   
    visible: (custom:number) => ({
      width: "170px",
    }),

  };

  const animateUserName = {

    hidden: {
      display: "none",
    },
   
    visible: (custom:number) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center", 
      transition: {
        delay: custom * 0.2,
        duration:0.7 * custom,
      },
    }),

  };




const UserInfo:React.FC<PropsType> = ({isShowUserInfo,userName,avatarIcon,userID}) => {

  const meID = useSelector(getMeID)

  return (

    <motion.div
      className={style.itemWrapper}
      initial ='hidden'
      animate={isShowUserInfo ? "visible" : "hidden"}
      custom ={0.5}
      variants={animateItem}
    >
      <div className={style.itemIconBody}>
        <div className={style.itemIconWrapper}>
          <img src={avatarIcon ? require(`../../../../Assets/user-icons/${avatarIcon}`) : defaultAvatar} 
               alt="userIcon" className={style.itemIcon} />
        </div>
        <span className={style.onlineLight}></span>
      </div>
      <motion.div className={meID === userID ? style.meName :style.userName}
                  initial ='hidden'
                  animate={isShowUserInfo ? "visible" : "hidden"}
                  variants={animateUserName}
                  custom ={1}
      >
        {userName}
      </motion.div>
    </motion.div>
  );
};

export default UserInfo;


type PropsType = {
  isShowUserInfo: boolean
  userName : string
  avatarIcon : string
  userID : string
}
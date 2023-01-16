import React, { useState } from 'react'
import style from './Icon.module.css'
import {motion} from 'framer-motion'
import checkIcon from '../../../../Assets/user-icons/check-mark.png'
import { actions } from '../../../../Redux/Reducers/Chat-reducer';
import { useDispatch } from 'react-redux';





const animateIcon = {
  hidden: {
    x : -100,
    opacity: 0,
    rotate:0 
  },

  visible: (custom:number) => ({
    x : 0,
    opacity:1,
    rotate:360,
  
    transition: {
      delay: custom * 0.5,
      duration:0.7,
      type: "spring",
      stiffness: 50,
      // damping: 70
    },
  }),
};

type PropsType = {
  icon : string
  index : number
  id : string
  iconSrc : string
  isCheckHandler : (id:string) => void
  isCheck : boolean
}


export const Icon:React.FC<PropsType> = ({icon,index,id,isCheckHandler,isCheck,iconSrc}) => {
  const [avatar,setAvatar] = useState(iconSrc) 
  const dispatch = useDispatch()

  const setIcon = () => {
      isCheckHandler(id)
      if(avatar === iconSrc ){
        setAvatar('')
      }else{
        setAvatar(iconSrc)
      }
      dispatch( actions.setProfilAvatar(avatar) )
  }

  return (
    <motion.div className={style.iconWrapper}
                initial ='hidden'
                whileInView="visible"
                viewport={{once: true }}
                custom={index + 1}
                variants={animateIcon}
                onClick = {setIcon}
    >
       { isCheck &&
        <div className={style.checkIconWrapper}>
           <img src={checkIcon} alt="check-icon" className={style.checkIcon} />
        </div>
       }
      <img src={icon} alt="profile-icon" className={style.icon} />
    </motion.div>
  )
}

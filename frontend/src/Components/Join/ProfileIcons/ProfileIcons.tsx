import React, { useState } from 'react'
import style from './ProfileIcons.module.css'
import { data } from './data'
import { Icon } from './Icon/Icon'
import {motion} from 'framer-motion'

const animateText = {
  hidden: {
    y : -50,
    opacity: 0,
  },

  visible: (custom:number) => ({
    y : 0,
    opacity:1,

    transition: {
      delay: custom * 0.5,
      duration:0.7,
      // type: "spring",
      // stiffness: 50,
      // damping: 70
    },
  }),
};

type PropsType = {
  textChooseProfileIcon : string
}

export const ProfileIcons:React.FC<PropsType> = React.memo( ({textChooseProfileIcon}) => {

  const [isCheck1, setIsCheck1] = useState(false)
  const [isCheck2, setIsCheck2] = useState(false)
  const [isCheck3, setIsCheck3] = useState(false)
  const [isCheck4, setIsCheck4] = useState(false)

  const isCheckHandler = (id:string) => {
    if(id === '1'){
      setIsCheck1(active => !active)
      setIsCheck2(false)
      setIsCheck3(false)
      setIsCheck4(false)
    }
    if(id === '2'){
      setIsCheck1(false)
      setIsCheck2(active => !active)
      setIsCheck3(false)
      setIsCheck4(false)
    }
    if(id === '3'){
      setIsCheck1(false)
      setIsCheck2(false)
      setIsCheck3(active => !active)
      setIsCheck4(false)
    }
    if(id === '4'){
      setIsCheck1(false)
      setIsCheck2(false)
      setIsCheck3(false)
      setIsCheck4(active => !active)
    }
  }


  return (

    <div className = {style.container}>
        <motion.h4 className = {style.chatParagraph}
                   initial ='hidden'
                   whileInView="visible"
                   viewport={{once: true }}
                   custom={5}
                   variants={animateText}
        >
          {textChooseProfileIcon}
        </motion.h4>
        <div className = {style.iconContainer}>
        {
          data.map( (avatar,index) => <Icon icon = {avatar.icon} 
                                            key = {avatar.id} 
                                            index = {index}
                                            id = {avatar.id}
                                            iconSrc = {avatar.iconSrc}
                                            isCheckHandler = {isCheckHandler}
                                            isCheck = { 
                                              (avatar.id === '1' && isCheck1) ||
                                              (avatar.id === '2' && isCheck2) ||
                                              (avatar.id === '3' && isCheck3) ||
                                              (avatar.id === '4' && isCheck4) 
                                            }
                                          
                                     />
                  )
        }
        </div>
    </div>
  )
})


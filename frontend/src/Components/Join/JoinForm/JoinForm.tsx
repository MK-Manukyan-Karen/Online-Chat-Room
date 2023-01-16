import React, { useContext} from "react";
import style from "./JoinForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useForm,SubmitHandler } from "react-hook-form";
import {motion} from 'framer-motion';

import {LanguageContext, LanguageContextType} from "../../Common/LanguageProvider/LanguageProvider";
import { Loading } from "../../Common/Loading/Loading";
import { createRoom } from "../../../Redux/Reducers/Chat-reducer";
import { getIsLoading, getMeAvatar} from "../../../Redux/Selectors/Chat-Selectors";






const animateErrorMassage = {
    hidden: {
      x : -100,
      opacity: 0,
    },
   
    visible: (custom:number) => ({
      x : 0,
      opacity:1,    
      transition: {
        delay: custom * 0.5,
        duration:0.7,
        type: "spring",
        // stiffness: 100,
        damping: 9
      },
    }),

  };

type JoinDataType = {
  userName : string,
  roomName : string
}  

export const JoinForm = () => {


  const { dictionary } = useContext<LanguageContextType>(LanguageContext);
  const { register,handleSubmit,formState: { errors, isSubmitting } } = useForm<JoinDataType>({ mode: "all" });
  const isLoading = useSelector(getIsLoading)
  const dispatch = useDispatch()
  const meAvatar = useSelector(getMeAvatar)

 
  const {
    roomName,
    userName,
    joinButtonName,
    roomErrorMessage,
    minLengthRoomErrorMessage,
    maxLengthRoomErrorMessage,
    userNameErrorMessage,
    maxLengthUserNameErrorMessage,
    minLengthUserNameErrorMessage,
  } = dictionary;



  const submit:SubmitHandler<JoinDataType> = ({roomName,userName})=> {
    dispatch(createRoom(roomName,userName,meAvatar)) 
  };


  return (
    <form className={style.joinForm} onSubmit={handleSubmit(submit)}>
      <input
        {...register("roomName", {
          required: roomErrorMessage,
          minLength: {
            value: 1,
            message: minLengthRoomErrorMessage,
          },
          maxLength: {
            value: 20,
            message: maxLengthRoomErrorMessage,
          },
        })}
        type="text"
        placeholder={roomName}
        className={style.field}
      />

      <div className={style.errorWrapper}>
        {errors?.roomName && (
          <motion.div className={style.error}
                      initial ='hidden'
                      animate ='visible'
                      custom={0.3}
                      variants={animateErrorMassage}
          >
            {errors?.roomName?.message || "Error"}
          </motion.div>
        )}
      </div>

      <input
        {...register("userName", {
          required: userNameErrorMessage,
          minLength: {
            value: 2,
            message: minLengthUserNameErrorMessage,
          },
          maxLength: {
            value: 11,
            message: maxLengthUserNameErrorMessage,
          },
        })}
        type="text"
        placeholder={userName}
        className={style.field}
      />

      <div className={style.errorWrapper}>
        {errors?.userName && (
          <motion.div className={style.error}
                      initial ='hidden'
                      animate="visible"
                      custom={0.3}
                      variants={animateErrorMassage}
          >
            {errors?.userName?.message || "Error"}
          </motion.div>
        )}
      </div>

      <div className={style.buttonWrapper}>
        <button type="submit" className={style.button} disabled={isSubmitting}>
          { !isLoading && !isSubmitting  ? joinButtonName : <Loading />  }
        </button>
        <span></span>
        <span></span>
      </div>
    </form>
  );
};

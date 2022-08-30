import React from "react";
import style from "./ErrorModal.module.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { actions } from "../../../Redux/Reducers/Chat-reducer";




const animateQuestion = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },

  visible: (custom: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: custom * 0.5,
      duration: 0.7,
      type: "spring",
      // stiffness: 100,
      damping: 9,
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

export const ErrorModal: React.FC<PropsType> = React.memo(({serverErrorMessage}) => {


  const dispatch = useDispatch();

  const setErrorModalShow = () => {
      dispatch(actions.setServerError(false))
  };

  return (
    <div className={style.modalContainer}>
      <motion.div
        className={style.body}
        initial="hidden"
        animate="visible"
        custom={0.3}
        exit="exit"
        variants={animateQuestion}
      >
        <div className={style.titleWrapper}>
          <p className={style.title}>{serverErrorMessage}</p>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.buttonYes} onClick={setErrorModalShow}>
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
});

type PropsType = {
  serverErrorMessage : string
}
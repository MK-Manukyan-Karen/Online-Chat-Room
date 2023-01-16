import React from "react";
import style from "./Modal.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { actions, userLeaveChat } from "../../../Redux/Reducers/Chat-reducer";
import { useNavigate } from "react-router-dom";
import { getMeData } from "../../../Redux/Selectors/Chat-Selectors";

type PropsType = {
  setShowModal: (show: boolean) => void;
};

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

export const Modal: React.FC<PropsType> = React.memo(({ setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meData = useSelector(getMeData)

  const leaveTheChat = () => {
    dispatch(userLeaveChat(meData))
    navigate("/");
    dispatch(actions.setIsJoin(false));
  };
  const doNotLeaveTheChat = () => {
    setShowModal(false);
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
          <p className={style.title}>You want to leave the chat?</p>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.buttonNo} onClick={doNotLeaveTheChat}>
            No
          </button>
          <button className={style.buttonYes} onClick={leaveTheChat}>
            Yes
          </button>
        </div>
      </motion.div>
    </div>
  );
});

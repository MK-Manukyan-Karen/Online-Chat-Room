import React from "react";
import style from "./Message.module.css";
import { MessageType, UserStatusInChatType } from "../../../Common/Types/Types";
import { useSelector } from "react-redux";
import { getMeID } from "../../../../Redux/Selectors/Chat-Selectors";
import defalutAvatar from "../../../../Assets/user-icons/defaultIcon.png";
import ShowUsersStatusInChat from "../../ShowUsersStatusInChat/ShowUsersStatusInChat";
import  distanceInWordsToNow  from 'date-fns/formatDistanceToNow';
import { ru } from 'date-fns/locale'

export const Message: React.FC<PropsType> = React.memo(({ message, userStatusInChat }) => {

    const meID = useSelector(getMeID);
 
    return (
      <>
        {message.message &&
          <div className={style.messageBody}>
            <div className={style.userIconWrapper}>
              <div
                className={
                  meID === message.user._id
                    ? style.messageArrowOwner
                    : style.messageArrow
                }
              ></div>
              <img
                src={
                  message.user.avatarIcon
                    ? require(`../../../../Assets/user-icons/${message.user.avatarIcon}`)
                    : defalutAvatar
                }
                alt="userIcon"
                className={style.userIcon}
              />
              <p className={style.userName}>{message.user.userName}</p>
            </div>
            <div
              className={
                meID === message.user._id
                  ? style.messageWrapperOwner
                  : style.messageWrapper
              }
            >
              <p className={style.message}>{message.message}</p>
            </div>
            <div className = {style.date}>
               {
                 distanceInWordsToNow(new Date(message.createdAt), 
                               { addSuffix: true,locale: ru }
                 )
               }
            </div>
          </div>
        }
        {userStatusInChat && (
          <ShowUsersStatusInChat userStatusInChat={userStatusInChat} />
        )}
      </>
    );
  }
);

type PropsType = {
  message: MessageType;
  userStatusInChat: UserStatusInChatType;
};

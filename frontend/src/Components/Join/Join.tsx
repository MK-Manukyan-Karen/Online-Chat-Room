import React, { useContext } from "react";
import style from "./Join.module.css";


import { LanguageSelector } from "./LanguageSelector/LanguageSelector";
import { LanguageContext,LanguageContextType} from "../Common/LanguageProvider/LanguageProvider";
import { ProfileIcons } from "./ProfileIcons/ProfileIcons";
import { JoinForm } from "./JoinForm/JoinForm";
import { useSelector } from "react-redux";
import { getIsServerError, getServerErrorMessage } from "../../Redux/Selectors/Chat-Selectors";
import { ErrorModal } from "../Common/ErrorModal/ErrorModal";


export const Join: React.FC = () => {

   
  const { dictionary } = useContext<LanguageContextType>(LanguageContext);
  const { chatroom, textChooseProfileIcon } = dictionary;
  const isServerError = useSelector(getIsServerError)
  const serverErrorMessage = useSelector(getServerErrorMessage)

  return (

    <div className={style.joinFormContainer}>
      <div className={style.square} style={{ "--i": 0 } as any} />
      <div className={style.square} style={{ "--i": 1 } as any} />
      <div className={style.square} style={{ "--i": 2 } as any} />
      <div className={style.square} style={{ "--i": 3 } as any} />
      <div className={style.square} style={{ "--i": 4 } as any} />
      <div className={style.square} style={{ "--i": 5 } as any} />
      { isServerError && <ErrorModal serverErrorMessage = {serverErrorMessage} /> }
      <div className={style.formWrapper}>
        <h1 className={style.paragraph}>{chatroom}</h1>
        <LanguageSelector />
        <ProfileIcons textChooseProfileIcon = {textChooseProfileIcon} />
        <JoinForm />
      </div>
    </div>
  );
};

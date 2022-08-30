import React, { useState } from "react";
import style from "./ChatSendMessageForm.module.css";
import { BsFillImageFill } from "react-icons/bs";
import { withSuspense } from "../../Common/Hooks/withSuspense";
import { useDispatch, useSelector } from "react-redux";
import { getMeData } from "../../../Redux/Selectors/Chat-Selectors";
import { addNewMessage } from "../../../Redux/Reducers/Chat-reducer";
const EmojiPicker = withSuspense(
  React.lazy(() => import("emoji-picker-react"))
);

export const ChatSendMessageForm: React.FC = () => {

  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<Array<any>>([]);
  const [height, setHeight] = useState(45);
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const dispatch = useDispatch()

  const meData = useSelector(getMeData)

  const TextareaChangeHendler = (e: any) => {
    setMessage(e.target.value);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage((message) => message + emojiObject.emoji);
    setIsShowEmoji(false);
  };

  const autoResizeTextareaHandler = (e: any) => {
    setHeight(e.target.scrollHeight);
    if (e.target.value === "") {
      setHeight(40);
    }
  };



  // const onChangeProfilePhotos = (e) => {
  //   if (e.target.files.length) {
  //     currentImage.current = e.target.files[0]
  //     let reader = new FileReader()
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result)
  //     }
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }
  const sendPhoto = (e: any) => {
    if (e.target.files.length) {
      for(let i = 0; i < e.target.files.length; i++ ){
         setPhoto(photo => [...photo,e.target.files[i].name])
      }
    }
  }

  const handleKeyPress = (e:any) => {
        if(e.key === 'Enter'){
          sendNewMessage()
  
        }
  }
 
    const sendNewMessage = () => {
      if(message){
        dispatch(addNewMessage(message,meData))
        setPhoto([]) 
        setMessage('')
      }
    };
  

    return (
      <div className={style.sendMessageFormContainer}>
        <div className={style.formWrapper}>
          <div className={style.emojiWrapper}>
            {isShowEmoji && (
              <div className={style.showEmoji}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <div
              className={style.emoji}
              onClick={() => setIsShowEmoji((isShow) => !isShow)}
            ></div>
          </div>

          <div className={style.sendFileWrapper}>

              <input type="file"
                     multiple
                     onChange={sendPhoto}
                     className={style.file}
                     name="userPhoto"
                     id="choseFile"
                     accept="image/*"
              />
   
            <label htmlFor="choseFile">
              <BsFillImageFill />
            </label>
          </div>

          <div className={style.textariaWrapper}>
            <textarea
              placeholder="Enter messages..."
              required
              onChange={TextareaChangeHendler}
              value={message}
              className={style.textarea}
              style={{ height: `${height}px` }}
              onKeyUp={autoResizeTextareaHandler}
              onKeyPress = {(e) => handleKeyPress(e)}
            ></textarea>
          </div>

          <div className={style.sendMessageWrapper}>
            <div className={style.messageButtonBody}>
             {(message || photo.length)  
               ? <button className={style.messageButton} onClick={sendNewMessage}></button>
               : <button className={style.messageButtonDisable}></button>
              }

             {
                !!photo.length && <div className = {style.photoCountInfo} onClick = { () => setPhoto([])}>
                                        <span>{photo.length}</span>
                                  </div>
             }
            </div>
          </div>

        </div>
      </div>
    )
  
}

import { MessageType } from './../Types/Types';
import { useState, useRef } from "react";
import { useEffect } from "react";



export const useScrollToBottom = (messages: Array<MessageType>):ScrollToBottomType => {

  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const elementEndBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isAutoScroll && elementEndBottomRef.current?.scrollIntoView();
  }, [messages]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (
      Math.abs( element.scrollHeight - element.scrollTop - element.clientHeight) <= 200
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  return {
    scrollHandler,
    elementEndBottomRef,
  };
};


type ScrollToBottomType = {
    scrollHandler : (e: React.UIEvent<HTMLDivElement>) => void,
    elementEndBottomRef : null | React.RefObject<HTMLDivElement> 
}
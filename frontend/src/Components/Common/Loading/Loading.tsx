import React from "react";
import style from './Loading.module.css'

export const Loading = () => {
  return (
    <div className= {style.loadingContainer}>
      <div className={style.loadingWrapper}>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
        <div className = {style.item}></div>
      </div>
    </div>
  );
};



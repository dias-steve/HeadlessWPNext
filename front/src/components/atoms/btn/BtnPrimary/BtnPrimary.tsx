/*=============================================
=        BTN PRYMARY Components            =
=============================================*/
/**
 * Main button component
 */

//Libraries
import React from 'react';
import Link from 'next/link';
//Style
import styles from './BtnPrimary.module.scss';


//Types
interface BtnPrimaryProps{
  available: boolean | null;
  handleClick?:  ((event:any) => void) | null;
  handleClickClose?: (() => void) | null;
  label: string;
  withClose?: boolean;
  grayColor?: boolean | null;
  link?: null | string;
  style?: false |{[key:string]: string}
  isSubmitBtn?: boolean
}

/**
 * Main Button use in the application
 * @param param0 availble, handleClick, label, grayColor, link, withClose
 * @returns 
 */
export default function BtnPrimary({available, handleClick, label, grayColor, link, withClose, handleClickClose, style, isSubmitBtn } : BtnPrimaryProps) {


  const handleClickCheck = handleClick && handleClick !== null? handleClick : (e: any) => {}
  const dimentionStyles = style || {};

  const BodyWithClose = 
  () => {
    return (
      <div className={styles.global_container_btn_withClose}>

      <div
      style={{...dimentionStyles}}
      className={[styles.global_container,
         available? styles.available : styles.not_available,
         grayColor ? styles.grayColor : styles.not_grayColor
        ].join(" ")}
      onClick = {(e: any) => {if (available){handleClickCheck (e)}}}
    >
    
    <span className={styles.label} dangerouslySetInnerHTML={{__html: label}}/>
    </div>
    <div className={styles.global_close_btn} onClick = {() => {if(handleClickClose && handleClickClose!== null){ handleClickClose()}}}> <img className={styles.close_icon}src={'/icon-cross.svg'} alt={'close icon'}/></div>
    </div>
    )
  }
  const Body = () => {
    return (

      <button
      type={isSubmitBtn ? 'submit': 'button'}
      style={{...dimentionStyles}}
      className={[styles.global_container,
         available? styles.available : styles.not_available,
         grayColor ? styles.grayColor : styles.not_grayColor
        ].join(" ")}
      onClick = {(e: any) => {if (available){handleClickCheck (e)}}}
    >
    <span className={styles.label} dangerouslySetInnerHTML={{__html: label}}/>
    </button>
   
    )
  }

  if(withClose){
    return (
      <BodyWithClose/>
    )
  }
  if (link && link !== ""){
    return (
      
      <Link href={link}>
        <Body/>
      </Link>
      )
  }else{
    return (
      <Body/>
      )
  }

}

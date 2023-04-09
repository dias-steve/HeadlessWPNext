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
import styles from './BtnLoadingMessage.module.scss';
import Spinner from '../../Spinner/Spinner';


//Types
interface BtnPrimaryProps{
  available: boolean | null;
  handleClick?: null  | ((event:any) => void);
  label: string;
  withClose?: boolean | null;
  grayColor?: boolean | null;
  link?: null | string;
  style?: false |{[key:string]: string}
}

/**
 * Main Button use in the application
 * @param param0 availble, handleClick, label, grayColor, link, withClose
 * @returns 
 */
export default function BtnLoadingMessage({  label, grayColor,  style, loading } :{label: string, grayColor: boolean, style: any, loading: boolean }) {



  const dimentionStyles = style || {};
  const Body = () => {
    return (
      <div
      style={{...dimentionStyles}}
      className={[styles.global_container,
         grayColor ? styles.grayColor : styles.not_grayColor
        ].join(" ")}
     
    >
    {loading ? <div className={styles.spinner_wrapper}><Spinner blackCircle={true}/></div>: 
    <span className={styles.label}>{label}</span>}
    </div>
    )
  }


    return (
      <Body/>
      )
  

}

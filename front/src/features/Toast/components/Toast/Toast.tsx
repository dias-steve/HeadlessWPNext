/*=============================================
=            TOAST PRENSENTATIONAL COMPONENTS          =
=============================================*/
/**
 * Toast Message
 */

//Library
import React from 'react';

//Style
import styles from './Toast.module.scss';

//Container
import { ToastProps, withToastContainer } from './ToastContainer';


/**
 * Toast View 
 * TO display a toast message into the screen
 * @param param0 
 * @returns 
 */
function ToastView({title, message, isPositif, itWillBeKilled,withBtnClose,handleCloseModal }: ToastProps) {
  return (
    <div className={[styles.global_container,itWillBeKilled ? styles.hide : styles.show ].join(" ")}>
      {isPositif ? <img  className={styles.icon} src={'/valid-cercle-icon.svg'} alt='valid icon'/>: <img className={styles.icon} src={'/notvalid-cercle-icon.svg'} alt='not valid icon'/>}
      {title && <h1 className={styles.title}>{title}</h1>}
      {message && <p className={styles.message}>{message}</p>}
  
      {withBtnClose && <span className={styles.btn} onClick={
        () => {
          handleCloseModal()
        }
      }>OK</span>}
    </div>
  )
}

/**
 * Toast Message 
 * To Display message into the screen
 */
export default withToastContainer(ToastView)

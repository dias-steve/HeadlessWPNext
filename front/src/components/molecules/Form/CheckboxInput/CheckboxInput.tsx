/*=============================================
=        CheckBoxInput              =
=============================================*/
/**
 * Style component checbox input
 */
import React from 'react'

import styles from './CheckboxInput.module.scss'

/**
 * Checbox input component
 * @param param0 
 * @returns 
 */
function CheckboxInput({setChange, value, errorMessage, label} : {setChange: any, value: any, errorMessage: string| null , label: string})  {

    const handleChange = (e: any) => {
        e.preventDefault();
        setChange(!value)
    }
  return (
    <div className={styles.global_container} onClick={handleChange}>

      <div className={styles.pin_wrapper}>
        <div className={[styles.pin, !value? styles.hide: styles.show].join(" ")}/>
      </div>
      <div className={styles.label_wrapper}>
      <span
        className={styles.title}
   
      >{label} </span>
      </div>
    </div>
  )
}

export default CheckboxInput

/*=============================================
=        INPUT FILEDS              =
=============================================*/
/**
 * Display a field input for text
 */

//Libraries
import React, { useState } from 'react'
import styles from './InputFields.module.scss';
import useTraductor from '@/features/multiLang/hooks/useTraductor';

/**
 * Display a field input for text
 * @param param0 
 * @returns 
 */
function InputField({setChange, value, errorMessage, label, type, blackStyle} : {setChange: any, value: any, errorMessage?: {message:string}| null , label: string, type: 'text' | 'textarea' | 'password', blackStyle?:boolean}) {
  
const [onFocus, setOnFocus] = useState(false);
const upName = onFocus || value != "" ? true : false;
const whiteStyle = false;
const error = errorMessage && errorMessage?.message !== "" ;
const textarea = type === 'textarea';
const{getTextStringTraduction}=useTraductor()
const handleChange = (e: any) => {
    e.preventDefault();
    setChange(e.target.value)

}

    return (
        <div className={styles.globalContainer}>
        <div className={[styles.inputGroup, textarea ? styles.textarea: styles.notTextarea, blackStyle ? styles.blackStyle : styles.notBlackStyle, whiteStyle ? styles.whiteStyle : " ", error ? styles.errorStyle : " "].join(" ")}>
        <label className={[styles.label, upName ? styles.upLabel : styles.notUpLabel, onFocus ? styles.onFocus : styles.NotFocus].join(" ")}>{label}</label>
            {(type === 'text' || type === 'password')&&
            <input type={type}
                onChange={handleChange}
                value={value}
                className={[styles.input].join(" ")}
                onFocus={() => {setOnFocus(true);}} 
                onBlur={() => {setOnFocus(false);}}
            />
            }
            {type === 'textarea' &&
            <textarea  className={[styles.input].join(" ")}
                onChange={handleChange}
                value={value}
                onFocus={() => {setOnFocus(true);}} 
                onBlur={() => {setOnFocus(false);}}
            />
            }
        </div>
        {errorMessage&& <div className={styles.messageErrorWrapper}><span className={styles.messageError}>{getTextStringTraduction(errorMessage.message)}</span></div>}
        </div>
    )
}

export default InputField
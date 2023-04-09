import React from 'react'
import { PopupViewProps, withContainer } from './_popupRGPDFunc'
import styles from './Popup.module.scss';
import Link from 'next/link';

const BtnPrimary = ({label, handleClick} : {label: string, handleClick: (e:any) => void}) => {
    console.log(label)
    return(
    <div className={styles.global_container_btn} onClick= {(e) => handleClick(e)}>
        <span className={styles.lable_btn} dangerouslySetInnerHTML={{__html: label}}/>
    </div>)
}
function PopupRGPD({title, message, primaryBTNLabel, pimaryBTNHandleClick, secondBTNLabel, secondBTNLink }:PopupViewProps) {
  return (
    <div className={styles.global_container}>
        { title &&
        <h1 className={styles.title} dangerouslySetInnerHTML={{__html: title}}/>
        }
        { message &&
        <p className={styles.message}dangerouslySetInnerHTML={{__html: message}}/>
        }

        {   secondBTNLink && secondBTNLink !== "" &&
            <Link className={styles.link}href={secondBTNLink}>
            <span className={styles.link_span} dangerouslySetInnerHTML={{__html:secondBTNLabel }}/>
            </Link>
        }

        <BtnPrimary label={primaryBTNLabel} handleClick={ (e) => pimaryBTNHandleClick(e)} />
    </div>
  )
}

export default withContainer(PopupRGPD)

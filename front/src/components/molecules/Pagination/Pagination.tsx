/*=============================================
=       Pagination View          =
=============================================*/
/**
 * Display the page dans next/ prev btn
 */

//Libraries
import { FC } from "react";

//Styles
import styles from "./Pagination.module.scss"

/**
 * Button Number Page
 * @param param0 
 * @returns 
 */
export const BtnNumber :  FC<{
    label: string | number;
    checked: boolean;
    onClick: () => void;
  }> = ({label, onClick,   checked})  => {
    const handleClick = (e:any) => {
        e.preventDefault();
        onClick();
    }
    return (
        <div className={[styles.btn_number_container, , checked && styles.checked ].join(" ")}
            onClick={(e) => handleClick(e)}
        >
            <span className={[styles.label].join(" ")}>{String(label)}</span>
        </div>
    )
}

/**
 * Next page button 
 * @param param0 
 * @returns 
 */
export const BtnNext :  FC<{
    onClick: () => void;
    label: string;
  }> = ({onClick, label})  => {

    const handleClick = (e:any) => {
        e.preventDefault();
        onClick();
    }
    return (
        <div  className={[styles.btn_next_prev, styles.btn_next].join(" ")}
              onClick={(e) => handleClick(e)}
        >
            <span className={styles.label} dangerouslySetInnerHTML={{__html:label}}/>
        </div>
    )
}

/**
 * Previous page button
 * @param param0 
 * @returns 
 */
export const BtnPrev :  FC<{

    onClick: () => void;
    label: string;
  }> = ({onClick, label})  => {
    const handleClick = (e:any) => {
        e.preventDefault();
        onClick();
    }
    return (
        <div
        className={[styles.btn_next_prev, styles.btn_next].join(" ")}
              onClick={(e) => handleClick(e)}
        >
            <span className={styles.label} dangerouslySetInnerHTML={{__html:label}}/>
        </div>
    )
}


/*=============================================
=        Line Background             =
=============================================*/
/**
 * Style component for line background
 */

//libraries
import React from 'react';

//styles
import styles from './LineBackground.module.scss';
import { useDynamicBackground } from '@/features/dynamicBackground/hooks/useDynamicBackground';
/**
 * Style Compneent displaying line background
 * @returns 
 */
export const LineBackground = () => {

    const {isBlack} =useDynamicBackground()
    return <>
                <img src={'/snow.gif'} alt='snow' className={styles.snow_background} /><div className={[styles.global_container,isBlack ? styles.black : styles.white ].join(" ")} >

              <div className={[styles.col,styles.col0].join(" ")}></div>
                <div className={[styles.col,styles.col1].join(" ")}></div>
                <div className={[styles.col,styles.col2].join(" ")}></div>
            <div className={[styles.col,styles.col4].join(" ")}></div>
    </div></>
}

export default LineBackground;
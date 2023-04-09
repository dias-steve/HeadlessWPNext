/*=============================================
=        PRESANTATIONNAL COMPONENTS MENU MODAL     =
=============================================*/
/**
 * Menu modal
 */

//LIB
import React, { useEffect, useLayoutEffect, useState } from 'react';

//Container
import { withMenuModalContainer } from './MenuModalContainer';

//Components
import MenuItem from '../../../MenuItem/MenuItem'

//Style
import styles from './MenuModal.module.scss';

/**
 * Presentational component for modal menu mobile
 * 
 * @param param0 
 * @returns 
 */
export function MenuModal({itWillClose} : {itWillClose:boolean}) {
  return (
    <div className={[styles.global_container,itWillClose?styles.transition_hide: styles.transition_show].join(" ")}>
        <div className={[styles.col,styles.col1].join(" ")}><MenuItem menuId ="menu_header_sec_2"/></div>
        <div className={[styles.col,styles.col2].join(" ")}><MenuItem menuId ="menu_header_sec_1"/></div>
    </div>
  )
}

export default withMenuModalContainer(MenuModal)

/*=============================================
=        Menu Burger BTN           =
=============================================*/
/**
 * Presentational component for menu button
 */

//Lib
import React from 'react';

//Styles
import styles from './MenuBurgerBtn.module.scss';

//Hooks
import { useNav } from '@/features/nav/hook/useNav';

//Container
import { withContainer } from './MenuBtnContainer'

/**
 * Buttom Icon Component 
 * 
 * @param param0 
 * @returns Button Component
 */
const Btn = ({iconSrc , altIcon, hoverIcon }: {iconSrc: string , altIcon:string, hoverIcon:string}) => {
  return (
  <div className={styles.global_container_btn}>
    <img className={[styles.icon, styles.icon_not_hover].join(" ")} src={iconSrc} alt={ altIcon}/>
    <img className={[styles.icon, styles.icon_hover].join(" ")}  src={hoverIcon} alt={ altIcon} />
  </div>
  )
}

/**
 * Menu Burger Btn View
 * @param param0 
 * @returns 
 */
function MenuBurgerBtn({handleClick, showCloseBtn} : {handleClick: (e:any) => void, showCloseBtn: boolean}) {

  return (
    <div className={styles.global_container}
        onClick={handleClick}
    >
      {!showCloseBtn ?
      <Btn 
      iconSrc = '/burger-menu.svg'
      altIcon = 'show menu modal'
      hoverIcon = '/burger-menu-orange.svg'
      />:
      <Btn 
      iconSrc = '/icon-cross.svg'
      altIcon = 'show menu modal'
      hoverIcon = '/icon-cross-orange.svg'
      />
      }
    </div>
  )
}

export default withContainer(MenuBurgerBtn);

/*=============================================
=        NAV Container Components                     =
=============================================*/
/**
 * Main Navigator of the website
 */

import { useMedia } from '@/hook/useMedia';
import React, { FC, useEffect } from 'react';
import { useScrollListenerNav } from '../../../hook/useScrollListenerNav';
import styles from './NavContainer.module.scss';
import { useNav } from '@/features/nav/hook/useNav';

/**
 * Manage the display mobile or desktop 
 * of the navigator
 * 
 * @param NavMobile Component Component the mobile navigator
 * @param NavDesktop Component displaying the desktop navigation
 * @param breakpointPx breakpoint in px
 * @returns 
 */
export const withContainer = (NavMobile : FC, NavDesktop: FC, breakpointPx: number) =>{
    return function Container() {
        const isMobile = useMedia("(max-width: "+breakpointPx+"px)")
        const {isShowMenuModal, setIsShowMenuModalNav, isEnableScrollListener, } = useNav()
        const {isShowNav,  isShow, showNav} =useScrollListenerNav(isEnableScrollListener)
      

        const isHideNav = !showNav && (isMobile ? 
            isShowMenuModal ? false : true : true
            )
        
        useEffect(() => {
            if(!isMobile){
                setIsShowMenuModalNav(false)
            }
        }, [isMobile])
        return ( <div className={[
                styles.global_container,isHideNav ?
                 styles.hide_nav : styles.show_nav
                ].join(" ")}>
                {!isMobile ?
                    <NavDesktop /> : <NavMobile />
                }
                </div>)
    }
}

export default withContainer
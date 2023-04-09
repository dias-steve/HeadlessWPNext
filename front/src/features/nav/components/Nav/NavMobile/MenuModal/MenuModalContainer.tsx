/*=============================================
=        MENU MODAL Container       =
=============================================*/
/**
 * Mount and unmount the modal menu 
 */

//Lib
import React, { FC } from 'react';

//Hoooks
import { useNav } from '@/features/nav/hook/useNav';
import { useMedia } from '@/hook/useMedia';

//Component
import { useTranstionDisplayComponents } from '@/hook/useTransitionDisplayComponent';

//style
import { breakpoint } from '@/styles/breakpoints';

/**
 * Container for the Modal Menu Component
 * @param ModalView Presentationnal Component
 * @returns 
 */
export const withMenuModalContainer= (ModalView: FC<{itWillClose: boolean}>) => {
  return function Container(){

    const {isShowMenuModal} = useNav()
    const breakpointPx = breakpoint.mobile
    const isMobile = useMedia("(max-width: "+breakpointPx+"px)")

    const {isKilledComponent, isWillBeKilledCompponent} = useTranstionDisplayComponents(isShowMenuModal, 300)
    
    return (<>{!isKilledComponent && isMobile && <ModalView itWillClose={isWillBeKilledCompponent}/>}</>)
  }

}

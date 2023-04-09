/*=============================================
=        CART MODAL Container       =
=============================================*/
/**
 * Mount and unmount the modal cart
 */

//Lib
import React, { FC } from 'react';

//Hoooks

import { useMedia } from '@/hook/useMedia';

//Component
import { useTranstionDisplayComponents } from '@/hook/useTransitionDisplayComponent';

//style
import { breakpoint } from '@/styles/breakpoints';
import useCart from '../../hooks/useCart';

/*=============================================
=        CART MODAL Type      =
=============================================*/

export interface CartModalProps {
    itWillClose: boolean
}
/**
 * Container for the Modal Menu Component
 * @param ModalView Presentationnal Component
 * @returns 
 */
export const withCartModalContainer= (ModalView: FC<CartModalProps>) => {
  return function Container(){
    const{isShowModal} = useCart() 

  

    const {isKilledComponent, isWillBeKilledCompponent} = useTranstionDisplayComponents(isShowModal, 300)
    
    return (<>{!isKilledComponent  && <ModalView itWillClose={isWillBeKilledCompponent}/>}</>)
  }

}
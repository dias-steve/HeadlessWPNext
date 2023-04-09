/*=============================================
=            Cart Icon           =
=============================================*/
/**
 * Btn to access to the cart list
 */
//Lib
import React from 'react';
//Styles
import styles from './CartIcon.module.scss'

//hooks
import useCart from '../../hooks/useCart';

//assets
import iconBlack from '@/public/cart_icon.svg'
import { IStore } from '@/redux/rootReducer';


export const CartIcon = () => {
    const {quantity, setShowModalCart} = useCart()
    return (
     <div className={styles.global_container} onClick={() => {
        setShowModalCart(true)
     }}>
        <div className={styles.icon_container}>
            <img className={[styles.icon, styles.icon_black].join(" ")}src={'/cart-icon.svg'}/>
            <img className={[styles.icon,  styles.icon_orange].join(" ")} src={'/cart-icon-orange.svg'}/>
        </div>{quantity >0 && <span className={[styles.quantity, ].join(" ")}>[{quantity}]</span>}</div>
    )

}

export default CartIcon;
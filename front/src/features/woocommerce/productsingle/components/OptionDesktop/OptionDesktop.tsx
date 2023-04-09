/*=============================================
=       Option Desktop      =
=============================================*/
/**
 * Display the options available for a Single product
 * */

//Libraries
import React, { useState } from 'react'

//Components
import SingleProduct from '..'
import BtnPrimary from '@/components/atoms/btn/BtnPrimary/BtnPrimary'

//Styles
import styles from './OptionDesktop.module.scss'

//Hooks
import useCart from '@/features/woocommerce/cart/hooks/useCart';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import { vocalubary } from '@/utils/vocabulary';

/**
 * Display the options available for a Single product
 * and the add to cart button
 * @returns 
 */
export default function OptionDesktop() {
    const { getBtnAddToCartProps:{available, handleClick} ,  isProductIndividualInCart}= useCart();
    const {getTextObjectTraduction} = useTraductor();
    const label = getTextObjectTraduction(vocalubary.add_to_card);
    const label_is_already_in_cart = getTextObjectTraduction(vocalubary.item_already_in_the_cart);
    const [waiting, setWaiting] = useState(false)
    const added = getTextObjectTraduction(vocalubary.added_to_the_cart);
  return (
    <div className={styles.global_container}>
            <SingleProduct.OptionVariableSelector/>
            <div style={{height: '38px', width:'100%', borderRadius: '16px'}} className={[styles.btn_add_to_cart_wrapper, waiting ? styles.show_added : '' ].join(" ")}> 
            {waiting ? <span className={styles.added_to_the_cart_message}>{added}</span>:<>
            <BtnPrimary link={null} label= {label} available={available} handleClick={() => { available && handleClick(); setWaiting(true); setTimeout(() => {setWaiting(false)}, 2000)}} withClose={false} grayColor={false} style={{height: '40px', width:'100%', borderRadius: '16px'}}
          handleClickClose={null}/>
            {isProductIndividualInCart && <p className={styles.already_in_cart_text}>{label_is_already_in_cart}</p>}
            </>
            }
            </div>   
    </div>
  )
}

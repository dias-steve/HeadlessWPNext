import React, { useEffect } from 'react'
import useCart from '../../hooks/useCart'
import CartList from '../CartList/CartList'
import styles from './Cart.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Primary } from '@/stories/Button.stories'
import BtnPrimary from '@/components/atoms/btn/BtnPrimary/BtnPrimary'
import useTraductor from '@/features/multiLang/hooks/useTraductor'
import { vocalubary } from '@/utils/vocabulary'


export const Loader = () => {
  return (<div>
    loading...
  </div>)
}
export default function CartView() {
  const{getTextObjectTraduction}=useTraductor()
    
  const {validateCart, isLoading,  getSubTotalPriceCart, getTotalQuantityItemCart,  isValidateCart} = useCart()

  
  const valid = isValidateCart()
  const router = useRouter()
 
  return (
    <div>
      <div className={styles.productList_wrapper}>
      <CartList />
      
      </div>
      {getTotalQuantityItemCart() > 0 &&
      <div className={styles.cart_info_container}>
      <p className={[styles.info_text].join(" ")}> {getTotalQuantityItemCart()}  {getTextObjectTraduction(vocalubary.item)}{getTotalQuantityItemCart() >1 &&'s'}</p>
      <p className={[styles.info_text].join(" ")}> {getTextObjectTraduction(vocalubary.subtotal)}: {getSubTotalPriceCart()}€</p>

 

      <BtnPrimary 
        label={getTextObjectTraduction(vocalubary.go_to_checkout)}
        available = {true}
        handleClick = {() => {router.push('/checkout')}}
        grayColor = {false}
        link = {null}
        withClose = {false}
        style={{}}
        handleClickClose={null}
        />
     </div>
  }
    

      
    

    </div>
  )
}

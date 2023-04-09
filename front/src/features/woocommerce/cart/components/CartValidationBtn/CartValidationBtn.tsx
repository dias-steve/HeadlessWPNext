import React from 'react'
import useCart from '../../hooks/useCart'
import styles from './CartValidationBtn.module.scss'
import BtnLoadingMessage from '@/components/atoms/btn/BtnLoadingMessage/BtnLoadingMessage'
import BtnPrimary from '@/components/atoms/btn/BtnPrimary/BtnPrimary'
import BtnDynamic from '@/components/atoms/btn/BtnDynamic/BtnDynamic'
import useTraductor from '@/features/multiLang/hooks/useTraductor'
function CartValidationBtn() {
    const {validateCart, isLoading,  getSubTotalPriceCart, getTotalQuantityItemCart,  isValidateCart} = useCart()
    const {getTextStringTraduction}=useTraductor()
    const label = getTextStringTraduction('FR=Valider le panier|EN=Validate the cart')
  return (
   
      <BtnDynamic  label={ label} grayColor={false} available={true} handleClick={(e: any) => {
            e.preventDefault()
            validateCart()
          }} isLoading={isLoading} isValidate={false} timeToDisplayValidation={0} validationLabel={''} withClose={false}/>

  )
}

export default CartValidationBtn

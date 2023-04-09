import React from 'react';
import styles from './BtnNext.module.scss'
import useCheckout from '../../hooks/useCheckout';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import BtnDynamic from '@/components/atoms/btn/BtnDynamic/BtnDynamic';

function BtnNext() {
    const {handleClickPaymentStripe,  isActifBtnPayment, isLoading, orderInfo} = useCheckout();
    const {getTextStringTraduction} = useTraductor()
    const label = getTextStringTraduction('FR=Payer|EN=Pay')+' '+orderInfo.getTotal()+'€'
  return (


    <BtnDynamic  label={label} grayColor={false} available={isActifBtnPayment()} handleClick={(e: any) => {
      e.preventDefault()
      handleClickPaymentStripe();
    }} isLoading={isLoading()} isValidate={false} timeToDisplayValidation={0} validationLabel={''} withClose={false}/>

  )
}

export default BtnNext

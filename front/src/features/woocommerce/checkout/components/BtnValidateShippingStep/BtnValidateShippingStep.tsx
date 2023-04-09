import React from 'react'
import useCheckout from '../../hooks/useCheckout'

import { useSelector } from 'react-redux'
import { IStore } from '@/redux/rootReducer'
import BtnDynamic from '@/components/atoms/btn/BtnDynamic/BtnDynamic'
import useTraductor from '@/features/multiLang/hooks/useTraductor'
const mapState = (state: IStore) => ({
    checkout : state.checkout
})
function BtnValidateShippingStep() {
   const{isLoading, validateShippingAndMethod}  =useCheckout()
   const {checkout} = useSelector(mapState)
       const {getTextStringTraduction}=useTraductor()
    const label = getTextStringTraduction('FR=Procéder au paiement|EN=Go to the payment')
  return (
          <BtnDynamic  label={label} grayColor={false} available={true} handleClick={(e: any) => {
            e.preventDefault()
            validateShippingAndMethod()
          }} isLoading={checkout.isLoading} isValidate={false} timeToDisplayValidation={0} validationLabel={''} withClose={false}/>

  )
}

export default BtnValidateShippingStep

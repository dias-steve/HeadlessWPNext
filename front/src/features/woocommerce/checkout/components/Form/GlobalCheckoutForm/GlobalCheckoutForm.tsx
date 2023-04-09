import React from 'react'
import useCheckout from '../../../hooks/useCheckout'
import InputField from '@/components/molecules/Form/InputFields/InputField';
import { CountryDropdown } from 'react-country-region-selector';
import CountrySelectInput from '@/components/molecules/Form/CountrySelectInput/CountrySelectInput';
import AddressForm from '../AddressForm/AddressForm';
import CheckboxInput from '@/components/molecules/Form/CheckboxInput/CheckboxInput';
import { useSelector } from 'react-redux';
import { IStore } from '@/redux/rootReducer';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import styles from './GlobalCheckout.module.scss'

const mapState = (state: IStore) =>({
  checkout: state.checkout,
  cart: state.cart
})

function GlobalCheckoutForm() {
  const { getTextStringTraduction} = useTraductor();
  const {getPropsFormFields,  isDifferentAdressBilling, } = useCheckout();
  return (
    <div>
      <div className={styles.address_wrapper}>
      <AddressForm label={getTextStringTraduction('FR=Adresse de livraison|EN=Shipping')} keyValueStore='shippingAddress'  />

      <InputField type={'text'} label={getTextStringTraduction('Email')} {...getPropsFormFields(['email'])} />
      <InputField type={'text'} label={getTextStringTraduction('FR=Télephone|EN=Phone')} {...getPropsFormFields(['phone'])} />
      <InputField type={'textarea'} label ={getTextStringTraduction('FR=Instructions de livraison (facultatif)|EN=Delivery instructions (optional)')}

            {...getPropsFormFields(['customerNote'])}/>
            </div>
      <CheckboxInput  label={getTextStringTraduction('FR=Adresse de facturation différente|EN=Different Billing Address')} {...getPropsFormFields(['isDifferentBillingAddress'])}  />
      {isDifferentAdressBilling &&
            <div className={styles.address_wrapper}>
      <AddressForm label={getTextStringTraduction('FR=Adresse de facturation|EN=Billing Address')} keyValueStore='billingAddress' />
      </div>
}



   
    </div>
  )
}

export default GlobalCheckoutForm
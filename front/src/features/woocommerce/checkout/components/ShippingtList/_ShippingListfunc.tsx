import { IStore } from '@/redux/rootReducer'
import React, { FC, useEffect} from 'react'
import { ShippingListWrapperProps, ShipppingMethodProps } from '../../types';
import { useSelector, useDispatch } from 'react-redux'
import ShippingMethod from '../../models/ShippingMethod';
import { v4 as uuidv4 } from 'uuid';
import useCheckout from '../../hooks/useCheckout';
import { fetchShippingDataStart, setShippingMethodSelected } from '../../redux/checkoutSlice';
import { getTotalShippingCost } from '@/features/woocommerce/cart/utils/cart.utils';
import useTraductor from '@/features/multiLang/hooks/useTraductor';


export const mapState = (state: IStore) =>({
  checkout: state.checkout,
  cart: state.cart
})

export interface NoMethodeShippmentAvaliableViewProps{
  message: string
}

export const withContainer = (WrapperContainer: FC<ShippingListWrapperProps>, ShippingMethodCompoment : FC<ShipppingMethodProps>, LoadingView: FC, NoMethodeShippmentAvaliableView : FC<NoMethodeShippmentAvaliableViewProps>) => {

  return function Container() {
    const {checkout, cart} = useSelector(mapState);
    const {shippingMethodAvailableList, isFeachingMethodShippment, shippingMethodSelected} = checkout;

    const listShippingAvailble : ShippingMethod[] = shippingMethodAvailableList;

    const dispatch = useDispatch();
    const {getTextStringTraduction} =useTraductor();
    const sectionTitle = getTextStringTraduction('FR=Moyen de Livraison|EN=Shipping Method')


    const noFoundMethodeMessage = getTextStringTraduction('FR=Désolé Aucun moyen de livraison n&#39est disponible pour votre pays |EN= Sorry, No shipping methode are available for your country')
    useEffect( () => {
      dispatch(fetchShippingDataStart());
    }, [])
    return(<WrapperContainer title ={sectionTitle}>
      {
        isFeachingMethodShippment ?  <LoadingView/>:
        listShippingAvailble.length > 0 && cart.listItemsValidated ?

        listShippingAvailble.map(shipping =>{

         const  ischecked = shippingMethodSelected?.getId() === shipping.getId()
         const handleClick = () => {
            dispatch(
              setShippingMethodSelected(shipping)
            )
         }

     
          const shippingCost = cart.listItemsValidated ? getTotalShippingCost(shipping.getMethodCost(), cart.listItemsValidated ) : 0
         
 

         return (
          <ShippingMethodCompoment
          handleClick = {handleClick}
          checked = {ischecked}
          key={uuidv4()}
          title = {shipping.getMethodUserTitle()}
          cost = {shippingCost}
          id = {shipping.getId()}
        />)}):

        <NoMethodeShippmentAvaliableView  message={noFoundMethodeMessage}/>
        

      }

    </WrapperContainer>)
  
  
}
}



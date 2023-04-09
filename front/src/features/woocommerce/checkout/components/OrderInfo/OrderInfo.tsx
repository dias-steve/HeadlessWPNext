import React from 'react'
import useCheckout from '../../hooks/useCheckout';

function OrderInfo() {
const { orderInfo} = useCheckout();

const { getSubTotalPrice, getTotal, getTotalQuantity, getSubTotalShippingCost} = orderInfo;
  return (
    <div>
          <p> total: {getTotal()}€ | subTotal: {getSubTotalPrice()}€ | shipping cost: {getSubTotalShippingCost()}€| nb:{getTotalQuantity()} </p>
    </div>
  )
}

export default OrderInfo

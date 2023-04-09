import React, { FC, MouseEventHandler } from 'react'
import { ShippingListWrapperProps, ShipppingMethodProps } from '../../types'
import { NoMethodeShippmentAvaliableViewProps, withContainer } from './_ShippingListfunc'
import styles from './ShippingList.module.scss'
import Spinner from '@/components/atoms/Spinner/Spinner'
export const ShippingList : FC<ShippingListWrapperProps> = ({title, children} : ShippingListWrapperProps ) => {

  return (
    <div className={styles.global_container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list_method}>
        {children} 
      </div>
    </div>
  )
}


export const ShippementMethode : FC<ShipppingMethodProps> = ({title, cost, id, checked, handleClick}: ShipppingMethodProps) =>{
  return (
    <div
    className={[styles.item_method_shipping_wrapper,checked ? styles.checked : ''  ].join(" ")}
    onClick ={ (event: any) => {
      event.preventDefault()
      handleClick()
    }}
    >
      <h3 className={styles.title} >{title}</h3> 
      <h3 className={styles.price}>{cost}€</h3></div>
  )
}

export const LoadingView: FC = () =>{
  return (
    <div className={styles.loading_container}><div className={styles.spinner_wrapper}><Spinner blackCircle={false}/></div></div>
  )
}

export const NoMethodeShippmentAvaliableView: FC<NoMethodeShippmentAvaliableViewProps> = ({message}:{message: string}) =>{
  return (

    <span  className={styles.no_found} dangerouslySetInnerHTML={{__html:message}} />
  )
}


export default withContainer(ShippingList, ShippementMethode,LoadingView, NoMethodeShippmentAvaliableView)
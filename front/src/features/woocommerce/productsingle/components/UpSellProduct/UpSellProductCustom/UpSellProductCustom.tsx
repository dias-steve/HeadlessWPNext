/*=============================================
=      UPSELL   PRODUCT LIST PRESTATIONAL COMPONENTS
=============================================*/
/**
 * Display the list of upsell products
 * relative to the single product
 */

//Libraries
import React from 'react'

//Container
import withUpSellProductContainer, { ViewListProductProps } from '../UpSellProductContainer'

//Components
import ProductListStatic from '@/components/molecules/ProductListStatic/ProductList'

//Styles
import styles from './UpSellProduct.module.scss'
import { vocalubary } from '@/utils/vocabulary'
import useTraductor from '@/features/multiLang/hooks/useTraductor'
export function UpSellProductCustom({listProduct}:ViewListProductProps) {


  const  {getTextObjectTraduction}= useTraductor()
  const title = getTextObjectTraduction(vocalubary.other_product)
  return (
    <div className={styles.global_container}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.list_product_wrapper}>
    <ProductListStatic listProduct={listProduct} cardSize={'medium small'} labelBtn={'voir'} />
    </div>
    </div>
  )
}

export default withUpSellProductContainer(UpSellProductCustom)

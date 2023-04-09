import React, {FC, ReactNode} from 'react';
import styles from './ProductList.module.scss';
import { withContainer } from './_productList.func';
import { ListProductWrapperViewProps } from './../../types';
import ProductCard, { ProductCardWrapper } from '../../../../../components/molecules/ProductCard/ProductCard';
import ProductListLoader from '@/components/molecules/ProductListLoader/ProductListLoader';



/*===================================================================
=            VIEW COMPONENT PRODUCT LIST       =
====================================================================*/


/**
 * Componant show when product is loading
 * @returns 
 */
export const  LoadingProductListView : FC = () => {
  return <span>is loading....</span>
}

export default withContainer(ProductListLoader,ProductCard,ProductCardWrapper)


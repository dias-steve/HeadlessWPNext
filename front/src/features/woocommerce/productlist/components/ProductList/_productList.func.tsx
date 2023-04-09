/*===================================================================
=            FONCTIONAL CONTAINER COMPONENT PRODUCT LIST       =
====================================================================*/

//library
import React,{FC, ReactNode, useEffect}  from 'react';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
//Types
import { ListProductWrapperViewProps, ProductCardProps, ProductCardSizeTypes } from './../../types';
import { IStore } from '@/redux/rootReducer';
import { IProductJSONAperçu } from '../../../types';
//Hooks
import useTraductor from '@/features/multiLang/hooks/useTraductor';

//MapState
const mapState = (state : IStore) => ({
  productList: state.productlist.productList,
  isLoading: state.productlist.is_loading
  
})

/**
 * 
 * @param WrapperViewComponent 
 * @param LoadingViewComponent 
 * @param ProductCardViewComponent 
 * @returns 
 */
export const withContainer = ( LoadingViewComponent : FC, ProductCardViewComponent : FC<{productData: IProductJSONAperçu, cardSize: ProductCardSizeTypes, labelBtn: string}>, ProductCardWrapper : FC<{children: ReactNode}>) => {
  return function Container() {
    const {productList, isLoading} = useSelector(mapState);
    const {getTextStringTraduction} = useTraductor();

    useEffect(() => {

      if(isLoading) {
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth'
        });
      }
    }, [isLoading])
    return (  
      <>
        { isLoading ? < LoadingViewComponent/>  : productList.map((product : IProductJSONAperçu) => 
        <ProductCardWrapper   key= {uuidv4()} >
        <ProductCardViewComponent productData={product} cardSize={'large large'} labelBtn={'FR=Voir|EN=See'} />
        </ProductCardWrapper>)}
        </>
    );
  }
}
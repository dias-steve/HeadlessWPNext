/*=============================================
=        PRODUCT LIST STATIC CONTAINER          =
=============================================*/
/**
 * Container component for product list static
 */
//Libraries
import { FC, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

//Types
import { ProductCardProps, ProductCardSizeTypes } from "@/features/woocommerce/productlist/types";
import { IProductJSONAperçu } from "@/features/woocommerce/types";

/**
 * Container component for product list static
 * @param ListWrapper Wrapper of the list
 * @param ProductCardContainer Presentationanl Component product Card
 * @param listProduct List of products to display
 * @param cardSize Siez of the card to display
 * @param labelBtn label of card product button
 * @returns 
 */
export const withProductListStaticContainer = (ListWrapper : FC<{children: ReactNode}>, ProductCardContainer : FC<{productData: IProductJSONAperçu, cardSize: ProductCardSizeTypes, labelBtn: string}>, listProduct: IProductJSONAperçu[], cardSize : ProductCardSizeTypes, labelBtn: string  ) => {

    return function Container (){

    
        return (
            <ListWrapper>
                {listProduct.map(product =>{

                    return(
                    <ProductCardContainer key={uuidv4()}
                        productData={product}
                        cardSize={cardSize}
                        labelBtn={labelBtn}
                    />)})
                }
                    
            </ListWrapper>
        )
    }
}
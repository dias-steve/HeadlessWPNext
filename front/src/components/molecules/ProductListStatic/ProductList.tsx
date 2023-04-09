/*=============================================
=        PRODUCT LIST STATIC           =
=============================================*/
/**
 * Presentation component for product list
 * Display the list of products from the static list
 */

//Libraries
import { ReactNode } from "react";

//Container
import { withProductListStaticContainer } from "./ProductListStaticContainer";

//Types
import { IProductJSONAperçu } from "@/features/woocommerce/types";
import { ProductCardSizeTypes } from "@/features/woocommerce/productlist/types";

//Components
import  ProductCard  from "../ProductCard/ProductCard";

/**
 * Wrapper of the ProductList
 * @param param0 
 * @returns 
 */
export const ProductListStaticWrapper = ({children}: {children: ReactNode}) => {
    return (
        <>
            {children}
        </>
    )
}

/**
 * Display the list of products from the static list
 * @param param0 
 * @returns 
 */
export const  ProductListStatic = ({listProduct, cardSize, labelBtn}: {listProduct:IProductJSONAperçu[], cardSize: ProductCardSizeTypes, labelBtn: string}) =>
{
    const ProductListWithContainer = withProductListStaticContainer(ProductListStaticWrapper,ProductCard,listProduct, cardSize, labelBtn)
    return <ProductListWithContainer />
}

export default ProductListStatic

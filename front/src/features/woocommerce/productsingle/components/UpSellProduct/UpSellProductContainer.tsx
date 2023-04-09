/*=============================================
=      UPSELL PRODUCT LIST    =
=============================================*/
/**
 * Display the list of upsell products
 * relative to the single product
 */

//Libraries
import React, { FC } from 'react'
import { useSingleProduct} from '../../hooks/useSingleProduct'
import { IProductJSONAperçu } from '@/features/woocommerce/types'



/*=============================================
=     Types   =
=============================================*/

export interface ViewListProductProps {
    listProduct: IProductJSONAperçu[]
}


/*=============================================
=      Container   =
=============================================*/
/**
 * UpSell Product Container
 * Manage and display the upsell products list 
 * relative to the single product
 * @returns 
 */
export default function withUpSellProductContainer(ViewListProduct: FC<ViewListProductProps> ) {

  return function Container(){
    const{up_sell_product_list}= useSingleProduct(null, false)

    if(up_sell_product_list && Array.isArray(up_sell_product_list) && up_sell_product_list.length > 0){
        const list_product_to_show = up_sell_product_list.slice(0,2)
        return (
            <ViewListProduct listProduct={list_product_to_show} />
        )
    }else{
        return <></>
    }

  }
}

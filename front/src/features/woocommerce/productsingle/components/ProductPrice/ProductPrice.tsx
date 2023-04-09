/*=============================================
=       Product Price   =
=============================================*/
/**
 * Show the price of a single product
 */

//Hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor"
import { useSingleProduct } from "../../hooks/useSingleProduct"
import { vocalubary } from "@/utils/vocabulary"

/**
 * Price 
 * Display the price of
 * @returns 
 */
export const PriceContainer = () => {
    const {price} = useSingleProduct(null, false)

    if(price){
        return (<>{price}€</>)
    }else{
        return(<></>)
    }

}

export const RegularPrice = () => {
    const {regular_price, on_sale} = useSingleProduct(null, false)

    if(on_sale){
        return (<>{regular_price}€</>)
    }else{
        return(<></>)
    }

}

export const ProductNotAvailable = () => {
    const {product_is_in_stock} = useSingleProduct(null, false)
    const {getTextObjectTraduction} = useTraductor()

    if(!product_is_in_stock){
        return (<>{getTextObjectTraduction(vocalubary.not_in_stock)}</>)
    }else{
        return(<></>)
    }

}

export const ProductSoldIndividually= () => {
    const {sold_individualy, product_is_in_stock} = useSingleProduct(null, false)
    const {getTextObjectTraduction} = useTraductor()

    if(sold_individualy && product_is_in_stock){
        return (<>{getTextObjectTraduction(vocalubary.sold_individualy)}</>)
    }else{
        return(<></>)
    }

}

export const PriceFrom = () => {
    const {getTextObjectTraduction} = useTraductor()
    const {    have_multi_price,
        price_min} = useSingleProduct(null, false)

    if(have_multi_price){
        return (<>{getTextObjectTraduction(vocalubary.from)} {Number(price_min).toFixed(2)}€</>)
    }else{
        return(<></>)
    }
}

export default {
    Price: PriceContainer,
    RegularPrice: RegularPrice,
    ProductNotAvailable,
    ProductSoldIndividually,
    PriceFrom

}
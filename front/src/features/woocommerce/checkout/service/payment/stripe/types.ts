/*=============================================
=            STRIPE TYPES               =
=============================================*/

import { IProductCart } from "@/features/woocommerce/cart/types"

/**
 * Type of Address Stripe
 */
export interface IAddressStripe{

    name: string,
    phone: string,
    address:{
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string, // country code
    }
}

export interface IAddressStripeBilling extends IAddressStripe{
    email: string,
}

export interface IShippingDetailsStripe{
    listitem: IProductCart[];
    amount: number, // in cents
    idorder: string | number,
    shipping: IAddressStripe,
    method_id: string,
}


export interface IBillingDetailsStripe{
            type: string, //'card'
            card: any,
            billing_details:IAddressStripeBilling
}


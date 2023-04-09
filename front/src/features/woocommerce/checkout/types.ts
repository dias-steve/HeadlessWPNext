/*=============================================
=            CHECKOUT TYPES                  =
=============================================*/

import { ReactNode } from "react";



export interface IShippingMethodJSON {
    method_title: string,
    method_rate_id: string,
    method_id: string // free_shipping or flat_rate
    method_user_title: string,
    method_is_enbled: boolean,
    method_cost: string | null,
    method_description: string;
    method_instance_id: number;
    min_amount:string | null;
}

export interface IZoneLocationJSON {
    code : string;
    type : ZoneLocationType
}

export type ZoneLocationType = "country" | "continent" | "region";
export interface IZoneShippment {
    zone_id: number;
    zone_name: string;
    zone_order: number;
    zone_locations:IZoneLocationJSON[];
    zone_formatted_location: string;
    zone_shipping_methods: IShippingMethodJSON[];
}

export interface ShippingListWrapperProps  {
    title : string;
    children: ReactNode
}

export interface ShipppingMethodProps {
    title: string;
    cost: number;
    id: string;
    checked: boolean;
    handleClick: () => void;

}

export interface WrapperCardProps {
    children: ReactNode
    title: string
}



/*=============================================
=              WOOCOMMERCE TYPES          =
=============================================*/


export interface IShippingAddressWC {
    first_name: string;
    last_name: string; 
    address_1: string; 
    address_2: string;
    city: string; 
    state: string;
    postcode: string; 
    country: string; 
}
export interface IPartBillingAddressWC {
    first_name: string;
    last_name: string; 
    address_1: string; 
    address_2: string;
    city: string; 
    state: string;
    postcode: string; 
    country: string; 

}
export interface IBillingAddressWC {
    first_name: string;
    last_name: string; 
    address_1: string; 
    address_2: string;
    city: string; 
    state: string;
    postcode: string; 
    country: string; 
    email: string;
    phone: string;
}

export interface ILineItemsOrder{
    product_id: string;
    quantity: string;
}

export interface ILineShipping {
    method_id: string;
    method_title: string;
    total: string;
}
export interface IOrderWC {
    billing: IBillingAddressWC,
    shipping: IShippingAddressWC,
    line_items:  ILineItemsOrder[],
    shipping_lines: ILineShipping[],
}

export interface IOrderWCCreated extends IOrderWC{
    id: number;
    total: string;
    status: string;

}

/** ===============Request Types woo ================ */
export interface ICreateOrderRequestBody {
    publickey: any; 
    order: IOrderWC;
}

export interface IValidateOrderWooBody {
    publickey: any; 
    order_id: string | number;
    paymentintent_id: any;
    paid: boolean;
}

export interface IsendNotesOrderBody{
    publickey: any; 
    order_id: string | number;
    note: string
}


export interface detailProductline {
    id: string;
    price: string;
    quantity: string;
    shipping_cost_unit: string;
    free_shippiment: null | boolean;
    sub_total: number;
}

export interface IOrderTotalResponseBody {
    trust_result: {
        is_trust: boolean;
        message: string;
    };
    detail:detailProductline[];
    shipping_method: IShippingMethodJSON;
    shippingCost: number;
    sub_total_product: number;
    sub_total_shipping: number;
    is_all_free_shipping: boolean;
    total: number;
    sub_total_shipping_cost_sup: number;
}

/*=====  End of   WOOCOMMERCE TYPES    ======*/
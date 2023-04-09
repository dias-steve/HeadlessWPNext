/*=============================================
=            product types          =
=============================================*/

import { ISEO } from "@/utils/initializePage.utils";


export interface IProductJSON extends IProductJSONAperçu{
    id_parent: number | string;
    id: string | number;
    name: string;
    price: string;
    images_gallery : IImageJSON[] ;
    on_sale: boolean;
    multi_price: {
        have_multi_price: boolean;
        price_max: string;
        price_min:string;
    }
    product_is_in_stock: boolean;
    link: string;
    shipping_cost_unit: string;
    sold_individualy: boolean;
    regular_price: string;
    sale_price: string;
    children: IProductVariant[] | null;
    general_information?:IGeneralInformationSingleProduct | null;
    free_shipping: boolean | null;
    variation_list_detail: {[varaitionKey : string]: {[variationValue: string]: IVariationValue}} | null;
    thumbnail:IImageJSON | null;
    title: string;
    list_variations: IListVartionsItem[] | null;
    product_is_variable: boolean
    variation_name: null;
    description: false | {[langCode:string]: string};
    size_guide: false | {[langCode:string]: IImageJSON};
    up_sell_product_list: false | IProductJSONAperçu[];
    variation_list_detail_v2: {[varaitionKey : string]: IVariationDetailsV2} | null;
    variation_name_display:IVariationNameDisplay[]| false| null;
    seo?:ISEO
}

export interface IGeneralInformationSingleProduct {
    html_information?: string | false | null;
}
export interface IPagination {
    current_page: number,
    max_page: number
}

export interface IRequestProductListFromBack{
    data:{
        nb_hit: number,
        page: IPagination,
        result:IProductJSON[]
    }


}
export interface IListVartionsItem {
    variation_name: string,
    variation_key: string,
    termes: {
        termes_stock_status: {
            [variationValue: string] : boolean
        };
        termes_names: string[];
        termes_in_stock:string[];
    }
}
export interface IGalleryAlt {
    key_variation: string | false;
    value_variation: string | false;
    thumbnail_term: IImageJSON|false;
    gallery:IImageJSON[]|false;
    thumbnail_apercu: IImageJSON | false
}
export interface IProductJSONAperçu {
    id: string | number;
    name: string;
    price: string;
    images_gallery : IImageJSON[]| null;
    on_sale: boolean;
    product_is_in_stock: boolean;
    link: string;
    sold_individualy: boolean;
    regular_price: string;
    sale_price: string;
    variation_name: {[variationKey: string] : string} | null;
    free_shipping: boolean | null;
    multi_price: {
        have_multi_price: boolean;
        price_max: string;
        price_min:string;
    }
    title_displayed: false | string;
    gallery_alt:IGalleryAlt[] | false;
    thumbnail:   IImageJSON | null,
}


export interface IProductStore {
    product_selected: IProductJSON | IProductVariant;
    product_parent: IProductJSON;
    variation_list_detail: {[varaitionKey : string]: {[variationValue: string]: IVariationValue}};
    list_variations: IListVartionsItem[];
    variations_selected: {[variationKey: string] : string}
    variations_stock_status : {[varaitionKey : string]: {[variationValue: string]: boolean}};
    product_is_valid: boolean,
    images_gallery : IImageJSON[]| null;
    variation_list_detail_v2: {[varaitionKey : string]: IVariationDetailsV2} | null;

}

export interface IVariationDetailsV2{
    key: string;
    name: string;
    label: string;
    value_list: {[variationValue: string]: IVariationValue}
}
export interface IVariationValue {
    term_id: number,
    name: string ,
    slug: string,
    term_group: number,
    term_taxonomy_id: number,
    taxonomy: string,
    description: string,
    parent: number,
    count: number,
    filter: string,
    thumnail: IImageJSON
}

export interface IVariationNameDisplay{
    variation_key: IVariationDetailsV2,
    variation_value: IVariationValue
}
export interface IProductVariant{
    id_parent: number;
    id: string | number;
    title_displayed: false | string;
    name: string;
    price: string;
    images_gallery : IImageJSON[]| null;
    on_sale: boolean;
    product_is_in_stock: boolean;
    link: string;
    shipping_cost_unit: string;
    sold_individualy: boolean;
    regular_price: string;
    sale_price: string;
    variation_name: {[variationKey: string] : string} | null;
    free_shipping: boolean | null;
    variation_name_display:IVariationNameDisplay[]| null | false;
    thumbnail: IImageJSON | null,
}



export interface IImageJSON {
    //ID: number;
    id?: number;
    //title : string;
    //filesize: number;
    url: string | null | false;
   // link: string;
    alt: string;
   // width: number;
    //height: number;
  }

  export interface IActionReducer {
    type : any;
    payload: any;
}




/*=============================================
=            product/stock/info            =
=============================================*/

/**
 * to send a request
 */
export interface IProductQuantity {
    id_parent: string|number;
    id: string|number;
    quantity: number
}

/**
 * the response
 */
export interface IProductStockInfo {
    id : string | number;
    title : string;
    in_stock : string;
    stock_quantity : number;
    available : boolean;
    code_error : number // 20 for quantity requier too hight or 10 for not in stock
}

export interface IStockStatusResponse {
    all_in_stock : boolean;
    items_no_stock : IProductStockInfo[]
}

/*=====  End of product/stock/info  ======*/


/*=============================================
=            woocommerce settings           =
=============================================*/
export interface IWooCommerceSettings {

        stripe_settings: {
          prod_mode_is_activated: string | false,
          test_mode_is_activated: string | false,
          page_link_gcs: string | false,
          info_text_gcs: string | false,
      },
      wc_pages: {
          myaccount_page_id: number,
          shop_page_id: number,
          cart_page_id: number,
          checkout_page_id: number,
          terms_page_id: number,
      }
      
}

/*=====  End of woocommerce settings ======*/
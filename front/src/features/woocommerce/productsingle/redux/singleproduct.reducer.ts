/*=============================================
=            SINGLE PRODUCT REDUCER         =
=============================================*/

import { IActionReducer, IImageJSON, IListVartionsItem, IProductJSON, IProductStore, IProductVariant, IVariationDetailsV2, IVariationValue } from "../../types";

/*=============================================
=          INITIAL STATE      =
=============================================*/
const INITIAL_STATE : IProductStore= {
  product_selected: {
    id_parent: 0,
    id: 0,
    title_displayed:false,
    name: "",
    price: "",
    images_gallery : null,
    on_sale: false,
    product_is_in_stock: false,
    link: "",
    shipping_cost_unit: "",
    sold_individualy: false,
    regular_price: "",
    sale_price: "",
    variation_name: null,
    free_shipping: false,
    variation_name_display:null,
    thumbnail:null,
  },
  images_gallery: [],
  product_parent: {
    id_parent: "",
    id:"",
    name: "",
    price: "",
    images_gallery : [],
    gallery_alt: false,
    on_sale: false,
    multi_price: {
        have_multi_price: false,
        price_max: "",
        price_min: "",
    },
    title_displayed:"",
    description: false,
    size_guide:false,
    product_is_in_stock: false,
    link: "",
    shipping_cost_unit: "",
    sold_individualy: false,
    regular_price: "",
    sale_price: "",
    children:null,
    free_shipping:false,
    variation_list_detail: null,
    thumbnail:null,
    title: "",
    product_is_variable: false,
    variation_name: null,
    list_variations: null,
    up_sell_product_list: false,
    variation_list_detail_v2: null,
    variation_name_display:null,
    general_information: null,
  },

  variation_list_detail: {},
  list_variations: [],
  variations_selected: {},
  variations_stock_status: {},
  variation_list_detail_v2:{},


  product_is_valid: true,
};

/*=============================================
=            TYPES           =
=============================================*/

export const singleProductTypes : {[key: string] : any} = {
  SET_SELECTED_PRODUCT: "SET_SELECTED_PRODUCT",
  SET_PRODUCT_PARENT: "SET_PRODUCT_PARENT",
  SET_LIST_VARIATIONS: "SET_LIST_VARIATIONS",
  SET_VARIATION_SELECTED: "SET_VARIATION_SELECTED",
  ON_SET_PRODUCT_PARENT_START: "ON_SET_PRODUCT_PARENT_START",
  SET_LIST_VARIATION_SELECTED_START: "ON_SET_LIST_VARIATION_SELECTE_START",
  SET_VARIATION_STOCK_STATUS: "SET_VARIATION_STOCK_STATUS",
  SET_VARIATION_LIST_DETAIL: "SET_VARIATION_LIST_DETAIL",
  SET_PRODUCT_IS_VALID: "SET_PRODUCT_IS_VALID",
  SET_IMAGE_GALLERY: "SET_IMAGE_GALLERY",
  SET_VARIATION_LIST_DETAIL_V2: "SET_VARIATION_LIST_DETAIL_V2"
};

/*----------  End Types  ----------*/

/*=============================================
=            ACTIONS          =
=============================================*/
export const setVariationListDetailV2Action = (variationListDetailV2:  {[varaitionKey : string]: IVariationDetailsV2} | null) =>({
  type: singleProductTypes.SET_VARIATION_LIST_DETAIL_V2,
  payload: variationListDetailV2,
})
export const setImageGalleryAction = (imageList : IImageJSON[]  ) => ({
  type: singleProductTypes.SET_IMAGE_GALLERY,
  payload: imageList,
});

export const setSelectedProduct = (product :IProductJSON | IProductVariant ) => ({
  type: singleProductTypes.SET_SELECTED_PRODUCT,
  payload: product,
});

export const setProductParent = (parentProduct:IProductJSON) => ({
  type: singleProductTypes.SET_PRODUCT_PARENT,
  payload: parentProduct,
});

export const setListVariations = (list: IListVartionsItem[] | null ) => ({
  type: singleProductTypes.SET_LIST_VARIATIONS,
  payload: list,
});

export const setVariationSelected = (varationsObject :{[variationKey: string] : string} | null) => ({
  type: singleProductTypes.SET_VARIATION_SELECTED,
  payload: varationsObject,
});

export const setParentProductStart = (product : IProductJSON) => ({
  type: singleProductTypes.ON_SET_PRODUCT_PARENT_START,
  payload: product,
});

export const setVariationSelectedStart = (listVariation : {[variationKey: string] : string}) => ({
  type: singleProductTypes.SET_LIST_VARIATION_SELECTED_START,
  payload: listVariation,
});

export const setVariationStockStatus = (variations_stock_status : {[varaitionKey : string]: {[variationValue: string]: boolean}} | null ) => ({
  type: singleProductTypes.SET_VARIATION_STOCK_STATUS,
  payload: variations_stock_status,
});

export const setVariationListDetailed = (variations_list_detail :  {[varaitionKey : string]: {[variationValue: string]: IVariationValue} }| null) => ({
  type: singleProductTypes.SET_VARIATION_LIST_DETAIL,
  payload: variations_list_detail,
});

export const setProductiSValidAction = (isValid : boolean) => ({
  type: singleProductTypes.SET_PRODUCT_IS_VALID,
  payload: isValid

})


/*=============================================
=            Reducer            =
=============================================*/
const singleProductReducer = (state = INITIAL_STATE, action : IActionReducer) => {
  switch (action.type) {

    case singleProductTypes.SET_VARIATION_LIST_DETAIL_V2:
      return {...state,  variation_list_detail_v2:action.payload}
    case singleProductTypes.SET_IMAGE_GALLERY:
      return {...state,   images_gallery: action.payload }
    case singleProductTypes.SET_PRODUCT_PARENT:
      return { ...state, product_parent: action.payload };
    case singleProductTypes.SET_SELECTED_PRODUCT:
      return { ...state, product_selected: action.payload };
    case singleProductTypes.SET_LIST_VARIATIONS:
      return { ...state, list_variations: action.payload };
    case singleProductTypes.SET_VARIATION_SELECTED:
      return { ...state, variations_selected: action.payload };

    case singleProductTypes.SET_VARIATION_STOCK_STATUS:
      return { ...state, variations_stock_status: action.payload };

    case singleProductTypes.SET_VARIATION_LIST_DETAIL:
      return { ...state, variation_list_detail: action.payload };

    case singleProductTypes.SET_PRODUCT_IS_VALID:
      return { ...state, product_is_valid: action.payload };
    default:
      return state;
  }
};

export default singleProductReducer;

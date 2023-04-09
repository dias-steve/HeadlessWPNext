
/*=============================================
=            CART REDUCER            =
=============================================*/

import {IAddRemovetoCartPayload, ICartStore, IProductCart, ItemsStockErrorMatrix } from "../types"


/*=============================================
=            INITIAL STATE CART            =
=============================================*/
export const INITIAL_STATE: ICartStore = {
    listItems : [],
    itemsStockErrorMatrix: {},
    isLoading : false,
    listItemsValidated: null,
    isShowModal: false,
}

/*=====  End of INITIAL STATE CART  ======*/




/*=============================================
=            TYPES            =
=============================================*/

export const cartTypes = {

    
    ADD_TO_CART: 'SET_TO_CART',
    REMOVE_TO_CART: 'REMOVE_TO_CART',
    RESET_THE_CART: 'RESET_THE_CART',
    SET_LIST_ITEMS: 'SET_LIST_ITEMS',
    SET_ITEMS_STOCK_ERROR_MATRIX: 'SET_ITEMS_STOCK_ERROR_MATRIX',
    SET_ISLOADING_CART: 'SET_ISLOADING_CART',
    VALIDATE_CART_START: 'VALIDATE_CART_START',
    SET_LIST_ITEMS_CART_VALIDATED: 'SET_LIST_ITEMS_VALIDATED',
    CLEAN_CART: 'CLEAN_CART',
    SET_SHOW_MODAL: 'SET_SHOW_MODAL'

}
/*=====  End of tYPES ======*/




/*=============================================
=            ACTIONS            =
=============================================*/

export const setShowModalCartAction = (isShow: boolean) => ({
    type: cartTypes.SET_SHOW_MODAL,
    payload: isShow
})
export const cleanCartAction = () => ({
    type: cartTypes.CLEAN_CART,
    payload: null
})
export const setListItemsCartValidated = (listItem: null | IProductCart[]) => ({
    type: cartTypes.SET_LIST_ITEMS_CART_VALIDATED,
    payload: listItem
})
export const validateCartStartAction = () => ({
    type: cartTypes.VALIDATE_CART_START,
    payload: {}
})
export const addToCartAction = ({product, quantity}: IAddRemovetoCartPayload) => ({
    type: cartTypes.ADD_TO_CART,
    payload: {product,quantity}
})

export const removeToCartAction = ({product, quantity}: IAddRemovetoCartPayload) => ({
    type: cartTypes.REMOVE_TO_CART,
    payload: {product,quantity}
})

export const setListItems = (listItem: IProductCart[]) => ({
    type: cartTypes.SET_LIST_ITEMS,
    payload: listItem
})

export const resetCartAction = () => ({
    type: cartTypes.RESET_THE_CART,
    payload: null
})

export const setItemsStockErrorMatrix = (matrix : ItemsStockErrorMatrix) => ({
    type: cartTypes.SET_ITEMS_STOCK_ERROR_MATRIX,
    payload: matrix
})

export const setIsLoadingCartAction= (isloading: boolean) => ({
    type: cartTypes.SET_ISLOADING_CART,
    payload: isloading
})
/*=====  End of ACTIONS ======*/


/*=============================================
=            REDUCER                         =
=============================================*/
const cartReducer = (state=INITIAL_STATE, action : any) =>{

    switch (action.type){
        case  cartTypes.SET_SHOW_MODAL:
        return {...state, isShowModal: action.payload}
        case cartTypes.SET_LIST_ITEMS: 
            return {...state,  listItems: action.payload }
        case cartTypes.SET_ITEMS_STOCK_ERROR_MATRIX : 
            return {...state, itemsStockErrorMatrix: action.payload}
        case cartTypes.SET_ISLOADING_CART:
            return {...state, isLoading: action.payload}
        case cartTypes.SET_LIST_ITEMS_CART_VALIDATED:
            return {...state, listItemsValidated: action.payload}
        case cartTypes.CLEAN_CART:
            return {...INITIAL_STATE}
        default:
            return state;
    }
} 
/*=====  End of REDUCER ======*/


export default cartReducer;




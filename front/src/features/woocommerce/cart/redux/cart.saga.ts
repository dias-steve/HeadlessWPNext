/*===================================================================
=            Cart Saga Side Effect                                           =
====================================================================*/

import { takeLatest, put, all, call, select } from "redux-saga/effects";
import {
  cartTypes,
  setIsLoadingCartAction,
  setItemsStockErrorMatrix,
  setListItems,
  setListItemsCartValidated,
} from "./cart.reducer";
import {
  IAddRemovetoCartPayload,
  ICartStore,
  IProductCart,
  IProductStockSatusBody,
} from "../types";
import { IStore } from "@/redux/rootReducer";
import { addToCart, getQueryStock, removeToCart } from "../utils/cart.utils";
import { handleFetchStatutStock } from "./cart.helpers";
import { useRouter } from "next/router";
import { ICheckoutState, setCurrentStepFormToShow, setNextStepFrom } from "../../checkout/redux/checkoutSlice";
import { step } from "../../checkout/components/CheckoutStepForm/CheckoutStepFormContainer";
import { toastPreset } from "@/features/Toast/utils/ToastPreset";
import { setIsPositiveAction, setIsShowToastAction, setMessageAction, setTitleAction, setWithBtnClose } from "@/features/Toast/redux/toastSlice";


export const getCart = (state: IStore) => state.cart;
export const getCheckout = (state: IStore) => state.checkout;

/*=============================================
=            SIDE EFFECT            =
=============================================*/

/**
 * Add to cart side Effect
 * Call when the user click on add to cart
 * @param payload : product: IproductJSON and quantiy: number
 */
export function* addProductToCartSideEffect({ payload }: any) {
  let state: ICartStore = yield select(getCart);

  const { listItems } = state;
  const { product, quantity }: IAddRemovetoCartPayload = payload;

  yield put(setListItems(addToCart(product, quantity, listItems)));

  // When when modify the cart, the cart is not valid
  yield put(setListItemsCartValidated(null));
}

/**
 * Remove to product to cart effect
 * it occure when the user edit his cart
 * @param payload product: IPorudctJSON and quantity to remove: number
 */
export function* removeProductToCartSideEffect({ payload }: any) {
  let state: ICartStore = yield select(getCart);

  const { listItems } = state;


  const { product, quantity }: IAddRemovetoCartPayload = payload;

  yield put(setListItems(removeToCart(product.id, quantity, listItems)));
  yield put(setListItemsCartValidated(null));
}

/**
 * Validation of the cart to the back
 * Check if the cart is fiable: if all items are availables
 * It occure when the user click on go the checkout
 * @param param0
 */
export function* validateCart({ payload }: any) {
  let state: ICartStore = yield select(getCart);
  let checkout : ICheckoutState = yield select(getCheckout)
  const { listItems } = state;
  const {currentStepFormToShow}= checkout
  const listItemsSnapShop: IProductCart[] = listItems;


  try {
    yield put(setIsLoadingCartAction(true));

    //Fetch the status stock of the items
    if(listItemsSnapShop.length >0){
    const query: string = getQueryStock(listItemsSnapShop);
    const { all_in_stock, items_no_stock }: IProductStockSatusBody =
      yield handleFetchStatutStock(query);

    // Results of fetching the status
    if (all_in_stock) {
      yield put(setListItemsCartValidated(listItemsSnapShop));
      yield put(setItemsStockErrorMatrix({}));
      if(currentStepFormToShow === 1){
        yield put(setCurrentStepFormToShow(step.shippingStep));
      }
     
    } else {
      yield put(setListItemsCartValidated(null));
      yield put(setItemsStockErrorMatrix(items_no_stock));
      const {isPositive, title, timeToDisplay, withBtnClose, message} = toastPreset.no_available_items
      yield put(setTitleAction(title));
      yield put (setMessageAction(message))
      yield put (setIsPositiveAction(isPositive))
      yield put (setWithBtnClose(withBtnClose))
      yield put (setIsShowToastAction(true))
      yield put(setCurrentStepFormToShow(step.cartStep));
      window.scrollTo(0,0)
    }
    }
    yield put(setIsLoadingCartAction(false));

  } catch (err: any) {
    console.log(err.message);
    yield put(setIsLoadingCartAction(false));
    throw { message: "pb reseau: we cannot validate the cart" };
  }
}

/*=====  End of SIDE EFFECT  ======*/

/*=============================================
=            CONNECT EVENT            =
=============================================*/

export function* onRemoveProductToCart() {
  yield takeLatest(cartTypes.REMOVE_TO_CART, removeProductToCartSideEffect);
}

export function* onAddProductToCart() {
  yield takeLatest(cartTypes.ADD_TO_CART, addProductToCartSideEffect);
}

export function* onValidateCartStart() {
  yield takeLatest(cartTypes.VALIDATE_CART_START, validateCart);
}

/*=====  End of CONNECT EVENT  ======*/

export default function* cartSagas() {
  yield all([
    call(onValidateCartStart),
    call(onRemoveProductToCart),
    call(onAddProductToCart),
  ]);
}

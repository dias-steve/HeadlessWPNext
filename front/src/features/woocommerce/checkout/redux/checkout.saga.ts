/*=============================================
=            CHECKOUT SIDE EFFECT            =
=============================================*/
/**
 * used for the checkout initalization
 * Used when the user change the counrty of the shipping adresss
 */

import { takeLatest, put, all, call, select } from "redux-saga/effects";
//types
import { IZoneShippment } from "../types";
//reducer
import {
  setShippingMethodAvailableList,
  setShippementManager,
  setCountryStart,
  setIsFeachingMethodShippment,
  setShippingMethodSelected,
} from "./checkoutSlice";
import { IStore } from "@/redux/rootReducer";

// Models
import ShippingMethod from "../models/ShippingMethod";
import ShippingObjectFactory from "../models/ShippingObjectFactory";

// helpers
import { handleFetchShippingData } from "./checkout.helpers";

// cart
import { getTotalPrice } from "../../cart/utils/cart.utils";

export const getState = (state: IStore) => state;

/**
 * set Counrty *********************************************************
 *
 * Call when the country of the shipping chekout field is changed
 * this makes the shipping method change
 * and the shipping method selected too
 * @param param0
 */
export function* setCountryEffect({ payload }: any) {
  const newCountryCode: string = payload;

  let state: IStore = yield select(getState);

  const { cart, checkout } = state;
  const { shippementManager } = checkout;

  //Check the state of the cart
  if (cart.listItemsValidated) {
    const totalPriceCart = getTotalPrice(cart.listItemsValidated);

    // getting the list of methode shipping availble for the cournty selected and the total price
    const listShippingMethodAvailble: ShippingMethod[] =
      shippementManager.getShippementMethodListByCountryCode(
        newCountryCode,
        totalPriceCart
      );
    yield put(setShippingMethodAvailableList(listShippingMethodAvailble));

    // we selected a shipping method
    // if any shipping method was found we set null
    yield put(
      setShippingMethodSelected(listShippingMethodAvailble?.[0] || null)
    );
  } else {
    // if no cart validated we clean the shipping method
    yield put(setShippingMethodSelected(null));
  }
}

/**
 * Ftech Shipping Data ***********************************************************************
 * from woocommerce backend
 *
 */
export function* fetchShippingData() {
  // display list shipping methods checkout loading
  yield put(setIsFeachingMethodShippment(true));
  try {
    // getting list of ZoneShippemnt from wc
    const listZoneShippement: IZoneShippment[] =
      yield handleFetchShippingData();

    let state: IStore = yield select(getState);
    const { cart, checkout } = state;

    // getting the country code by default
    const {
      shippingAddress: { country },
    } = checkout;

    //Building the shippiment manager object
    if (Array.isArray(listZoneShippement)) {
      const shippementObjectFactory = new ShippingObjectFactory();
      const shippementManager =
        shippementObjectFactory.getShippementManager(listZoneShippement);

      yield put(setShippementManager(shippementManager));

      //getting the shipping methode available
      // of the cournty set by default on the shipping address field
      yield put(setCountryStart(country));
    }
  } catch (error: any) {
    console.log(error);
  }
  // show the shipping methode available list to the user
  yield put(setIsFeachingMethodShippment(false));
}

/*=============================================
=            CONNECT AND CALLS            =
=============================================*/

export function* onFetchShippingData() {
  yield takeLatest("checkout/fetchShippingDataStart", fetchShippingData);
}
export function* onSetCountry() {
  yield takeLatest("checkout/setCountryStart", setCountryEffect);
}

export default function* checkoutSaga() {
  yield all([call(onSetCountry), call(onFetchShippingData)]);
}

/*=====  End of CONNECT AND CALLS  ======*/

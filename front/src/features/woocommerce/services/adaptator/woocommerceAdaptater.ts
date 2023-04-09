/*=============================================
=            WOO COMMERCE CONVERTER        =
=============================================*/
/**
 * All function the convert data
 *
 */

// Types
import { IProductCart } from "../../cart/types";
import {
  IBillingAddressWC,
  ILineItemsOrder,
  IShippingAddressWC,
} from "../../checkout/types";

// Reducers
import { ICheckoutState } from "../../checkout/redux/checkoutSlice";

// Utils
import { getCountryNameFromCountryCode } from "../../checkout/utils/getContinentCodeFromCounrtryCode";

/**
 * Convert list cart product to List item WC
 *
 * the list items is used to create
 * a woo commerce order
 * @param listCartProduct llist of item from the checkout
 * @returns list item WC
 */
export const convertListCartProductToListItemWC = (
  listCartProduct: IProductCart[]
): ILineItemsOrder[] => {
  return listCartProduct.map<ILineItemsOrder>((item) => {
    const { product, quantity } = item;
    return {
      product_id: String(product.id),
      quantity: String(quantity),
    };
  });
};

/**
 * get Billing Address WC from checkout
 *
 * it for convert the billing address checkout state
 * to a billing adress woo commerce for the creations of
 * a woo commerce order
 *
 * @param checkout state of the checkout
 * @returns
 */
export const getBillingAddressWCFromCheckout = (
  checkout: ICheckoutState
): IBillingAddressWC => {
  const {
    billingAddress,
    shippingAddress,
    isDifferentBillingAddress,
    email,
    phone
  } = checkout;

  if (isDifferentBillingAddress) {
    return {
      first_name: billingAddress.first_name,
      last_name: billingAddress.last_name,
      address_1: billingAddress.address_1,
      address_2: billingAddress.address_2,
      city: billingAddress.city,
      state: billingAddress.state,
      postcode: billingAddress.postcode,
      country: billingAddress.country,
      email: email,
      phone: phone,
    };
  } else {
    return {
      first_name: shippingAddress.first_name,
      last_name: shippingAddress.last_name,
      address_1: shippingAddress.address_1,
      address_2: shippingAddress.address_2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postcode: shippingAddress.postcode,
      country: shippingAddress.country,
      email: email,
      phone: phone,
    };
  }
};

/**
 * get shipping Address WC from checkout
 *
 * it for convert the shipping address checkout state
 * to a shipping adress woo commerce for the creations of
 * a woo commerce order
 *
 * @param checkout state of the checkout
 * @returns
 */
export const getShippingAddressWCFromCheckout = (
  checkout: ICheckoutState
): IShippingAddressWC => {
  const { shippingAddress } = checkout;
  return {
    first_name: shippingAddress.first_name,
    last_name: shippingAddress.last_name,
    address_1: shippingAddress.address_1,
    address_2: shippingAddress.address_2,
    city: shippingAddress.city,
    state: shippingAddress.state,
    postcode: shippingAddress.postcode,
    country: getCountryNameFromCountryCode(shippingAddress.country),
  };
};

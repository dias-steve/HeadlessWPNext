/*===================================================================
=            Cart Hooks                                             =
====================================================================*/

//Reducers
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@/redux/rootReducer";
import {
  addToCartAction,
  setShowModalCartAction,
  validateCartStartAction,
} from "../redux/cart.reducer";

//Utils
import {
  getTotalPrice,
  getTotalQunatityCart,
  getTotalShippingCost,
  isInCart,
} from "../utils/cart.utils";
import { useEffect, useState } from "react";
import { $CombinedState } from "redux";

//Maps state
const mapState = (state: IStore) => ({
  singleProduct: state.singleproduct,
  cart: state.cart,
  checkout: state.checkout,
});

/**
 *
 * Hooks Compomonent for manage the cart
 */
const useCart = () => {
  const { singleProduct, cart, checkout } = useSelector(mapState);
  const dispatch = useDispatch();

  const { product_selected } = singleProduct;
  const isProductIndividualInCart = product_selected.sold_individualy && isInCart( product_selected, cart.listItems)
  const available: boolean = !isProductIndividualInCart && product_selected.product_is_in_stock
    ? true
    : false;

    const [quantity, setQuantity] = useState(getTotalQunatityCart(cart.listItems))
    useEffect(() => {
      setQuantity(getTotalQunatityCart(cart.listItems))
    },[cart.listItems])
  /**
   * Handle Add to Cart button
   * @param e : event click object
   */
  const handleClick: any = () => {
    if (available) {
      dispatch(addToCartAction({ product: product_selected, quantity: 1 }));
    }
    //TODO: Event add to Card
  };

  /**
   * Get Total sub total of the cart
   * Just the product * quantity
   * @returns () => total number
   */
  const getSubTotalPriceCart = () => getTotalPrice(cart.listItems);

  /**
   * Get Total Quantity of the cart
   * Just the quantity + quantity...
   * @returns () => total number
   */
  const getTotalQuantityItemCart = () => getTotalQunatityCart(cart.listItems);

  /**
   * Get Total Shipping of the cart
   * Give the total of shipping cost plus shippint cost unit per product
   * @returns () => total number
   */
  const getTotalShippingsCart = () => {
    if (checkout.shippingMethodSelected) {
      const shippingMethodCost =
        checkout.shippingMethodSelected.getMethodCost();
      return getTotalShippingCost(shippingMethodCost, cart.listItems);
    }
    return null;
  };

  /*=============================================
    =            Section List Item Validated           =
    =============================================*/
  /**
   * This section its for the list item validated
   * for the checkout
   *
   */

  const getSubTotalPriceCartValidate = () => {
    if (cart.listItemsValidated) {
      getTotalPrice(cart.listItemsValidated);
    } else {
      return null;
    }
  };

  const getTotalShippingsCartValidate = () => {
    if (checkout.shippingMethodSelected && cart.listItemsValidated) {
      const shippingMethodCost =
        checkout.shippingMethodSelected.getMethodCost();
      return getTotalShippingCost(shippingMethodCost, cart.listItemsValidated);
    }
    return null;
  };

  const isValidateCart = (): boolean => {
    return cart.listItemsValidated
      ? cart.listItemsValidated.length > 0
        ? true
        : false
      : false;
  };
  const validateCart = () => {
    dispatch(validateCartStartAction());
  };

  const setShowModalCart = (isShow: boolean) => {
    console.log('show')
    dispatch(setShowModalCartAction(isShow))
  }

  /*=====  End of Item validated  ======*/

  return {
    setShowModalCart,
    isShowModal: cart.isShowModal,
    getSubTotalPriceCartValidate,
    getTotalShippingsCartValidate,
    listItemsValidated: cart.listItemsValidated,
    isValidateCart,
    isLoading: cart.isLoading,
    validateCart,
    getTotalShippingsCart,
    getSubTotalPriceCart,
    getTotalQuantityItemCart,
    quantity,
    handleAddtoCartClick: handleClick,
    getBtnAddToCartProps: {
      available,
      handleClick,
    },
    isProductIndividualInCart
  };
};

export default useCart;

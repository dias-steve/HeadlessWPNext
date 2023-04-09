/*=============================================
=            USE CHECKOUT HOOKS            =
=============================================*/
/**
 * Use to manage the checkout
 */
import {
  IBillingAddressWC,
  ILineItemsOrder,
  ILineShipping,
  IOrderWCCreated,
  IShippingAddressWC,
} from "../types";

//CHECKOUT STATE
import { useSelector, useDispatch } from "react-redux";
import {
  setBillingAddress,
  setCountryStart,
  setEmail,
  setPhone,
  setShippingAddress,
  setIsDiffrentBillingAddress,
  setIsValidForm,
  setErrorStatus,
  setIsLoading,
  cleanCheckoutState,
  setCurrentStepFormToShow,
  setOrderIdValidated,
  setCustomerNote,
  setCardName,
} from "../redux/checkoutSlice";
import { IStore } from "@/redux/rootReducer";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

//UTILS
import {
  getSatutsValidationCheckout,
  getSatutsValidationPaymentFieldsSpripeCheckout,
} from "../utils/validateForm.utils";

//CART
import {
  cleanCartAction,
  setItemsStockErrorMatrix,
  setListItemsCartValidated,
  validateCartStartAction,
} from "../../cart/redux/cart.reducer";
import {
  fetchCartStockStatus,
  getTotalPrice,
  getTotalQunatityCart,
  getTotalShippingCost,
  getQueryStock,
} from "../../cart/utils/cart.utils";
import { IProductCart } from "../../cart/types";

//WOOCOMMERCE
import {
  convertListCartProductToListItemWC,
  getBillingAddressWCFromCheckout,
  getShippingAddressWCFromCheckout,
} from "../../services/adaptator/woocommerceAdaptater";
import {
  checkTotalFromBackWC,
  createOrder,
  sendNotesOrderWoo,
  validateOrderWoo,
} from "../../services/order/order.utils";

// STRIPE
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { processPaymentStripe } from "../service/payment/stripe/utils/stripe.utlis";
import ShippingMethod from "../models/ShippingMethod";
import IoError from "@/errors/IoError";

//ERROR
import {
  codeErrorCheckout,
  errorTypesIdCheckout,
} from "../errors/errorsHandler";

//UTILS EXTERN
import { step } from "../components/CheckoutStepForm/CheckoutStepFormContainer";

//HOOKS
import { useToast } from "@/features/Toast/hook/useToast";
import { toastPreset } from "@/features/Toast/utils/ToastPreset";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

//STORE
const mapState = (state: IStore) => ({
  checkout: state.checkout,
  cart: state.cart,
});

/**
 *
 * Map setter reducer for the form control
 */
const mapSetterState: { [key: string]: ActionCreatorWithPayload<any> } = {
  billingAddress: setBillingAddress,
  shippingAddress: setShippingAddress,
  email: setEmail,
  phone: setPhone,
  isDifferentBillingAddress: setIsDiffrentBillingAddress,
  customerNote: setCustomerNote,
  cardName: setCardName,
};

/*=============================================
=           CONTAINER HOOKS            =
=============================================*/
/**
 * Checkout hook
 * manage the checkout
 * @returns
 */
export const useCheckout = () => {
  /*=============================================
  =           SETTINGs HOOKS          =
  =============================================*/
  //STATE
  const { checkout, cart } = useSelector(mapState);
  const { country } = checkout.shippingAddress;
  const checkoutValue: { [key: string]: any } = checkout;

  const dispatch = useDispatch();

  //STRIPE SETTINGS
  const stripe = useStripe();
  const elements = useElements();

  const { displayToastPreset } = useToast();

  const { getTextStringTraduction } = useTraductor();

  /*=====  End of Section  SETTING HOOKS ======*/

  /*=============================================
  =            FUNCTION HOOKS            =
  =============================================*/

  /**
   * Get Props Form Fields ****************************************************
   *
   * Generates props for input fields
   * @param keys
   * @returns
   */
  const getPropsFormFields = (keys: string[]) => {
    const [fieldName, subFieldName] = keys;

    //GETTING THE RIGHT SETTER STATE
    const setter: ActionCreatorWithPayload<any> = mapSetterState[fieldName];

    /*============ 1/3 NO NESTED FIELD STATE - BEGIN ===============*/
    /**
     * Those fields state have no sub Fields
     * like email fields state or phone state
     */
    if (!subFieldName) {
      // value of the field
      const value = checkoutValue[fieldName];

      // Error message: if exist or null
      const errorMessage: string | null =
        checkoutValue.errorStatus[fieldName] &&
        checkoutValue.errorStatus[fieldName]?.message
          ? checkoutValue.errorStatus[fieldName]
          : null;

      // setChange: to use it for a handleChnage event on field
      const setChange = (newValue: any) => {
        const newStatus = { ...checkoutValue.errorStatus, [fieldName]: null };

        if (checkoutValue.errorStatus[fieldName]) {
          dispatch(setErrorStatus(newStatus));
        }

        // put the new value on the field state
        dispatch(setter(newValue));

        dispatch(setIsValidForm(false));
      };

      return {
        value,
        setChange,
        errorMessage,
      };
    }
    /*============ NO NESTED FIELD STATE - END ===============*/

    /*============ 2/3 COUNTRY SHIPPING FIEDLS STATE - BEGIN ===============*/
    /*
     * That fieald have its own setChange function
     */
    if (fieldName === "shippingAddress" && subFieldName === "country") {
      // value of the field
      const value = country;

      // setChange: to use it for a handleChnage event on field
      const setChange = (newCountry: string) => {
        dispatch(
          setShippingAddress({
            ...checkout.shippingAddress,
            country: newCountry,
          })
        );

        // put the new value on the field state
        dispatch(setCountryStart(newCountry));

        dispatch(setIsValidForm(false));
      };

      return {
        setChange,
        value,
        errorMessage: null,
      };
    } else {
      /*============ COUNTRY SHIPPING FIEDLS STATE - END ===============*/

      /*============ 3/3 OTHER NESTED FIEDLS STATE - BEGIN ===============*/
      /**
       * Those fiels state have nested fields
       * as shipping address state = {first_name: 'John', last_name: 'Smith', ...}
       */
      // value of the field
      const value = checkoutValue[fieldName][subFieldName];

      // Error message: if exist or null
      const errorMessage: any = checkoutValue.errorStatus[fieldName]?.[
        subFieldName
      ]
        ? checkoutValue.errorStatus[fieldName][subFieldName]
        : null;

      // setChange: to use it for a handleChnage event on field
      const setChange = (newValue: any) => {
        // put the new value on the field state
        dispatch(
          setter({ ...checkoutValue[fieldName], [subFieldName]: newValue })
        );

        //clean error message of this field on change
        const field = {
          [fieldName]: {
            ...checkoutValue.errorStatus[fieldName],
            [subFieldName]: null,
          },
        };
        const newStatus = { ...checkoutValue.errorStatus, ...field };

        if (checkoutValue.errorStatus[fieldName]?.[subFieldName]) {
          dispatch(setErrorStatus(newStatus));
        }

        dispatch(setIsValidForm(false));
      };
      return {
        value,
        setChange,
        errorMessage,
      };
    }
    /*============ OTHER NESTED FIEDLS STATE - END ===============*/
  };

  /**
   *Validation of the form checkout
   * @returns checkout validated
   */
  const validateForm = () => {
    const errorStatus = getSatutsValidationCheckout(checkout);

    // if we have no error in from field
    if (Object.entries(errorStatus).length <= 0) {
      dispatch(setErrorStatus({}));
      dispatch(setIsValidForm(true));
    } else {
      dispatch(setIsLoading(false));
      dispatch(setErrorStatus(errorStatus));
      dispatch(setIsValidForm(false));
      dispatch(setCurrentStepFormToShow(step.shippingStep));
      displayToastPreset(toastPreset.form_invalid);
    
      window.scrollTo(0, 0)

      throw new IoError(
        "Form not valid",
        errorTypesIdCheckout.FORM_FIELD_USER_ERROR,
        codeErrorCheckout.FLIED_NO_VALID
      );
    }

    return checkout;
  };

  /**
   * Validate Form Payment **********************************************
   * 
   * Validation Form of the payment stripe
   * Check if all importent fiedls are good
   * such as the card name
   * @returns void
   */
  const validateFormPaymentStripe = () => {
    //we check the error status general
    const errorStatus =
      getSatutsValidationPaymentFieldsSpripeCheckout(checkout);
    // if we have no error in from field
    if (Object.entries(errorStatus).length <= 0) {
      dispatch(setErrorStatus({}));
      dispatch(setIsValidForm(true));
    } else {


      dispatch(setIsLoading(false));
      dispatch(setErrorStatus(errorStatus));
      dispatch(setIsValidForm(false));

      //Go back the payment step
      dispatch(setCurrentStepFormToShow(step.paymentStep));

      //Display Toast
      displayToastPreset(toastPreset.form_card_name_no_valid);
      throw new IoError(
        "Card Name is missing",
        errorTypesIdCheckout.FORM_FIELD_USER_ERROR,
        codeErrorCheckout.FLIED_NO_VALID
      );
    }
    return checkout;
  };

  /**
   * get List od Item validated ********************************************************
   *
   * for use to checkout process
   * And update the validation
   * @returns list of items validated
   */
  const getListItemCartValidated = async () => {
    //UPATDATE VALIDATION 1/2
    //that generate a listItemsValidated in the checkout state
    dispatch(validateCartStartAction());

    // if the listItemsValidated state is empty then
    // the cart validation failed
    if (!(cart.listItemsValidated && cart.listItemsValidated.length > 0)) {
      dispatch(setCurrentStepFormToShow(step.cartStep));
      dispatch(setIsLoading(false));
      displayToastPreset(toastPreset.card_no_valid);
      throw { message: "cart not vaild" };
    }

    //check the stock of each item
    const listItems = cart.listItemsValidated;
    const result = await fetchCartStockStatus(listItems);

    // if no result at all : we have pb backend
    if (!result) {
      dispatch(setIsLoading(false));
      displayToastPreset(toastPreset.internal_Error);
      throw new IoError(
        "We can not fetch the stock status from the backend",
        errorTypesIdCheckout.INTERN_GENERAL_ERROR,
        codeErrorCheckout.FETCHING_STOCK_STATUS_LIST_NOT_AVAILABLE
      );
    }

    const { all_in_stock, items_no_stock } = result;

    // clean the list of itemValidated states for prepare the update
    dispatch(setListItemsCartValidated(null));

    // push the result of stocks status of the items
    dispatch(setItemsStockErrorMatrix(items_no_stock));

    if (!all_in_stock) {
      //go to the cart step
      dispatch(setCurrentStepFormToShow(step.cartStep));
      dispatch(setIsLoading(false));
      displayToastPreset(toastPreset.no_available_items);
      throw new IoError(
        "some items in the cart are not available",
        errorTypesIdCheckout.ITEM_NOT_IN_STOCK_PAYMENT,
        null
      );
    }

    //update the list of item validates
    dispatch(setListItemsCartValidated(listItems));

    // GET LISTITEMS 2/2
    return listItems;
  };

  /**
   * Method Shipping Validation ***********************************************
   *
   * Check and Validate the methode shipping chosen by the user
   * @param listItem list item validate
   * @returns methode shipping chosen
   */
  const methodShippementValidation = (
    listItem: IProductCart[]
  ): ILineShipping => {
    // if no shipping methode chosen we quit
    if (checkout.shippingMethodSelected === null) {
      dispatch(setIsLoading(false));
      dispatch(setCurrentStepFormToShow(step.shippingStep));
      displayToastPreset(toastPreset.form_no_shipping_methode_selected);
      throw new IoError(
        "No shipping method selected",
        errorTypesIdCheckout.FORM_FIELD_USER_ERROR,
        codeErrorCheckout.NO_METHOD_SHIPPING_SELECTED_BY_THE_USER
      );
    }

    const method = checkout.shippingMethodSelected;

    // Getting the real cost of the shipping methode
    // with the shipping unit cost of items
    const totalCostShippemnt = getTotalShippingCost(
      method.getMethodCost(),
      listItem
    );

    // Return the shipping methode with the real cost
    return {
      method_id: method.getId(),
      method_title: method.getMethodUserTitle(),
      total: String(totalCostShippemnt),
    };
  };

  /**
   * Clear checkout and Cart ********************************
   *
   * used when the checkout is done
   */

  const clearCheckout = () => {
    //Clean checkout
    dispatch(cleanCheckoutState());

    //clean cart
    dispatch(cleanCartAction());
  };

  /**
   * validate Shipping And Method *************************
   * 
   * Validate the shipping form and the method shipping
   */
  const validateShippingAndMethod = async () => {
    dispatch(setIsLoading(true));
 
    //Validation of the form fields
    validateForm();

    //Validation and checkin stockstatus of the listItem
    const listItemToPay = await getListItemCartValidated();

    //Validation of the method shipping chosen by the user
    methodShippementValidation(listItemToPay);

    //Go to the payment
    dispatch(setIsLoading(false));
    dispatch(setCurrentStepFormToShow(step.paymentStep));
  };

  /**
   * Proccess Payment *******************************************************
   *
   * To process the validations at the end payment
   */
  const processPayment = async (
    processPaymentPlatform: (
      billingAddressWC: IBillingAddressWC,
      shippingAddressWC: IShippingAddressWC,
      otherArg: any,
      order: IOrderWCCreated,
      listItemToPay: IProductCart[],
      method: ILineShipping
    ) => void
  ) => {
    try {
      // checkout pay btn is loading status
      dispatch(setIsLoading(true));

      // getting real total price of the order
      const amount = getTotal();
      if (!amount) {
        displayToastPreset(toastPreset.internal_Error);
        throw new IoError(
          "no amount found in the checkout",
          errorTypesIdCheckout.INTERN_GENERAL_ERROR,
          codeErrorCheckout.AMOUNT_FRONT_UNDEFINED
        );
      }
      /*===========CHECK CART AND FORM BEGIN ==============*/
      //Validation form payment
      validateFormPaymentStripe();
      //Validation of the form fields
      const checkoutValidated = validateForm();

      //Validation and checkin stockstatus of the listItem
      const listItemToPay = await getListItemCartValidated();

      //Validation of the method shipping chosen by the user
      const method = methodShippementValidation(listItemToPay);

      /*===========CHECK CART AND FORM END ==============*/

      /*===========ORDER WOOCOMMERCE CREATION BEGIN ==============*/

      //COVERTION 1/2
      // convertion of the listItem to a listitem Readable by Woocommerce
      const listItemWC: ILineItemsOrder[] =
        convertListCartProductToListItemWC(listItemToPay);

      const shippingAddressWC =
        getShippingAddressWCFromCheckout(checkoutValidated);
      const billingAddressWC =
        getBillingAddressWCFromCheckout(checkoutValidated);

      //CREATION ORDER 2/2
      // creation order to the backend
      const order: IOrderWCCreated = await createOrder(
        shippingAddressWC,
        billingAddressWC,
        method,
        listItemWC,
        checkoutValidated.customerNote
      );

      const { id } = order;
      /*===========ORDER WOOCOMMERCE CREATION END ==============*/

      /*===========CHECK AMOUNT MATCH BEGIN ==============*/

      //CHECK MATCH 1/2
      // Chechink front and backend woocommerce module
      // if the amount displayed to the user match with the amount calculeted by the backend woocommerce
      //it not check the shipping amount
      if (Number(amount) !== Number(order.total)) {
        sendNotesOrderWoo(
          id,
          "[intern error] Front total amount dosent match with order total [front amount: " +
            amount +
            "], The order is not trustable."
        );
        validateOrderWoo(id, null, false);
        displayToastPreset(toastPreset.internal_Error);
        throw new IoError(
          "amount not match with the amount order amout: " +
            amount +
            " order amount: " +
            order.total,
          errorTypesIdCheckout.INTERN_GENERAL_ERROR,
          codeErrorCheckout.AMOUT_FRONT_ORDER_NOT_MATCH
        );
      }

      //CHECK MATCH 2/2
      // Cheching match front amount and backend calculator
      // the backend calculator will calculate the amount
      //and check the shipping amount
      const query = getQueryStock(listItemToPay);

      try {
        await checkTotalFromBackWC(query, method.method_id, amount, null);
      } catch (err: any) {
        sendNotesOrderWoo(id, "[From FRONTEND ERROR] amount does not match");
        sendNotesOrderWoo(id, "[From FRONTEND ERROR DETAIL]" + err.message);
        validateOrderWoo(id, null, false);
        displayToastPreset(toastPreset.internal_Error);
        throw new IoError(
          err.message,
          errorTypesIdCheckout.INTERN_GENERAL_ERROR,
          codeErrorCheckout.AMOUT_FRONT_BACK_NOT_MATCH
        );
      }

      /*===========CHECK AMOUNT MATCH BEGIN ==============*/

      /*===========PAYMENT PROCESSING BEGIN ==============*/
      await processPaymentPlatform(
        billingAddressWC,
        shippingAddressWC,
        checkoutValidated.cardName,
        order,
        listItemToPay,
        method
      );

      //GoToValidation
      dispatch(setOrderIdValidated(order.id));

      /*===========PAYMENT PROCESSING END ==============*/
    } catch (error) {
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  /**
   * process PaymentStripe Adaptater ******************************************************
   *
   * Hydrate the process payment stripe function before to call it
   *
   * @param billingAddressWC address of billing
   * @param shippingAddressWC address of shipping
   * @param order order from woo commmerce
   * @param listItemToPay list of ProductCart validated for checkout
   * @param method method shipping
   */
  const processPaymentStripeAdaptater = (
    billingAddressWC: IBillingAddressWC,
    shippingAddressWC: IShippingAddressWC,
    otherArg: any,
    order: IOrderWCCreated,
    listItemToPay: IProductCart[],
    method: ILineShipping
  ) => {
    processPaymentStripe(
      billingAddressWC,
      shippingAddressWC,
      order,
      listItemToPay,
      method.method_id,
      otherArg.cardName,
      stripe,
      elements,
      () => {
        dispatch(setCurrentStepFormToShow(step.validationStep));
        dispatch(setIsLoading(false));
        clearCheckout();
      },
      (preset) => {
        displayToastPreset(preset);
        dispatch(setIsLoading(false));
      }
    );
  };

  /**
   * Handle Click PaymentStripe ************************************************************
   *
   * Process the payment stripe request
   *
   */
  const handleClickPaymentStripe = () => {
    processPayment(processPaymentStripeAdaptater);
  };

  /**
   * Is Actived BTN Payment************************************************************************
   *
   * is Activivated id the shipping method is chosen by user
   * if Total is calculated
   * @returns if the payment btn id activedted
   */
  const isActifBtnPayment = () => {
    return checkout.shippingMethodSelected
      ? true
      : false && cart.listItemsValidated && getTotal();
  };

  /**
   * Get Total******************************************************************
   *
   * Calcul the sum of all the shipping cost, unit shipping coet and price items
   * @returns
   *    NUMBER : total price of the list items validated
   * OR
   *    NULL : return null if the shippingMethode si not yet chosen by the user
   */
  const getTotal = (): number | null => {
    if (cart.listItemsValidated && checkout.shippingMethodSelected) {
      const method = checkout.shippingMethodSelected;
      const totalCostShippemnt = getTotalShippingCost(
        method.getMethodCost(),
        cart.listItemsValidated
      );
      return Number(
        (getTotalPrice(cart.listItemsValidated) + totalCostShippemnt).toFixed(2)
      );
    } else {
      return null;
    }
  };

  /**
   * Get Sub Total Price ****************************************************************
   *
   * Calcul the sum of all and price items
   * @returns
   *    NUMBER : total price of the list items validated
   * OR
   *    NULL : return null if the si no item validate
   */
  const getSubTotalPrice = (): number | null => {
    if (cart.listItemsValidated) {
      return getTotalPrice(cart.listItemsValidated);
    } else {
      return null;
    }
  };

  /**
   * Get Sub Total Shipping *******************************************************************
   *
   * Calcul the sum of all the unit shipping cost of each item and the shipping cost
   * of the method shipping chosen by the user
   * @returns
   *    NUMBER : total price of the list items validated
   * OR
   *    NULL : return null if the si no shipping methode chosen yet by the user
   */
  const getSubTotalShippingCost = (): number | null => {
    if (cart.listItemsValidated && checkout.shippingMethodSelected) {
      const method = checkout.shippingMethodSelected;
      const totalCostShippemnt = getTotalShippingCost(
        method.getMethodCost(),
        cart.listItemsValidated
      );
      return Number(totalCostShippemnt.toFixed(2));
    } else {
      return null;
    }
  };

  /**
   * Get Sub Total Quantity *****************************************************
   *
   * Calcul the sum of the quantity of each item in the list items validated
   * @returns
   *    NUMBER : total price of the list items validated
   * OR
   *    NULL : return null if the si no item validate
   */
  const getTotalQuantity = (): number | null => {
    if (cart.listItemsValidated) {
      return getTotalQunatityCart(cart.listItemsValidated);
    } else {
      return null;
    }
  };

  /**
   * GET ITEM VALIDATED *********************************************************
   *
   * Get list of the item validated previously
   *
   * @returns item validated perviously in the cart
   */
  const getListItemValidated = (): IProductCart[] | null => {
    return cart.listItemsValidated;
  };
  return {
    orderInfo: {
      getTotalQuantity,
      getTotal,
      getSubTotalPrice,
      getSubTotalShippingCost,
      getListItemValidated,
    },
    isActifBtnPayment,
    isLoading: () => checkout.isLoading,
    handleClickPaymentStripe,
    isDifferentAdressBilling: checkout.isDifferentBillingAddress,
    getPropsFormFields,
    validateShippingAndMethod,
  };
};

export default useCheckout;

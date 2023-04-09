/*=============================================
=            STRIPE UTILS                  =
=============================================*/

import axios from "axios";

//Types
import { IProductCart } from "@/features/woocommerce/cart/types";
import {
  IAddressStripe,
  IAddressStripeBilling,
  IBillingDetailsStripe,
  IShippingDetailsStripe,
} from "../types";
import {
  IBillingAddressWC,
  IOrderWCCreated,
  IShippingAddressWC,
} from "@/features/woocommerce/checkout/types";

//order utils
import {
  sendNotesOrderWoo,
  validateOrderWoo,
} from "@/features/woocommerce/services/order/order.utils";

//Error
import IoError from "@/errors/IoError";
import { errorTypesIdCheckout } from "@/features/woocommerce/checkout/errors/errorsHandler";

//Components
import { IPresetToast } from "@/features/Toast/hook/useToast";
import { toastPreset } from "@/features/Toast/utils/ToastPreset";

/**
 * Handle Payment Stripe
 * Push the payment to stirpe
 *
 * @param stripe stripe object
 * @param billingAddress
 * @param shippingAddress
 * @param elements stripe lib object
 * @param amount number in cents
 * @param idOrder order id woocommerce
 * @param sendNote function to send note to order woocommerce
 * @param validateOrder function to send the validation of the order woocommerce
 * @param listItem list of item of the order
 * @param method_id id of the method shipping : the idmathoderate
 * @param callbackSucces function call when the payment have been processed with sucess
 * @param callbackError function call whenever a error occure while the payment processing
 */
export const handlePaymentStripe = async (
  stripe: any,
  billingAddress: IAddressStripeBilling,
  shippingAddress: IAddressStripe,
  elements: any,
  amount: number,
  idOrder: string | number,
  sendNote: (id: number | string, message: string) => void,
  validateOrder: (
    orderId: string | number,
    paymentIntentId: string | number | null,
    isPayed: boolean
  ) => void,
  listItem: IProductCart[],
  method_id: string,
  callbackSucces: () => void,
  callbackError: (preset: IPresetToast) => void
) => {
  console.log('dans stripe')
  try {
    sendNote(idOrder, "Stripe payment processing");

    const cardElement = elements.getElement("card");

    /*================== CONVERT THE ADDRESS FOR STRIPE - BEGIN ==================== */
    const shippingDetail: IShippingDetailsStripe = {
      method_id,
      listitem: listItem,
      amount: amount,
      idorder: idOrder,
      shipping: shippingAddress,
    };

    const billingDetails: IBillingDetailsStripe = {
      type: "card",
      card: cardElement,
      billing_details: billingAddress,
    };

    /*===================== CONVERT THE ADDRESS FOR STRIPE - END ==================== */

    /*================== SEND PAYMENT TO STRIPE - BEGIN ==================== */

    // sending to api
    const { data: clientSecret } = await axios.post("api/payments/stripe", {
      ...shippingDetail,
    });

    const { paymentMethod } = await stripe.createPaymentMethod(billingDetails);

    /**
     * if no payment method found then no card
     * have been inter by user
     */
    if (!paymentMethod) {
      // the card number is not correct
      sendNote(idOrder, "Card not valid");
      validateOrder(idOrder, null, false);
      callbackError(toastPreset.card_no_valid);
      throw new IoError(
        "Error Stripe: Card number not valid",
        errorTypesIdCheckout.CARD_NOT_VALID,
        null
      );
    }

    /**
     * if no paymentIntent found then
     * the card wasn't right
     */
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });
    if (!paymentIntent) {
      // the card have been declined
      sendNote(idOrder, "Card declined");
      validateOrder(idOrder, null, false);
      callbackError(toastPreset.paiment_declined);
      throw new IoError(
        "Error Stripe: Card declined",
        errorTypesIdCheckout.CARD_DECLINED,
        null
      );
    }

    // VALIDATION OF THE PAYMEN
    // Payment went good
    validateOrder(idOrder, paymentIntent.id, true);
    callbackSucces();

    /*================== SEND PAYMENT TO STRIPE - END ==================== */
  } catch (error: any) {
    sendNote(idOrder, "[Stripe Error Detail] " + error.message);
    validateOrder(idOrder, null, false);

    if(!(error instanceof IoError) ){
      callbackError(toastPreset.internal_Error_no_payment_done);
    }
    throw error;
  }
};

/**
 * Process Payment
 *
 * Calleed by the use checkout
 *
 * @param billingAddress address billing
 * @param shippingAddress address shipping
 * @param order order pré created by woocommerce
 * @param listItem list of the item in the cart
 * @param method_id method shipping id
 * @param stripe stripe object
 * @param elements stripe object
 * @param callbackSucces function call when the payment have been processed with sucess
 * @param callbackError function call whenever a error occure while the payment processing
 */
export const processPaymentStripe = (
  billingAddress: IBillingAddressWC,
  shippingAddress: IShippingAddressWC,
  order: IOrderWCCreated,
  listItem: IProductCart[],
  method_id: string,
  cardName: string,
  stripe: any,
  elements: any,
  callbackSucces: () => void,
  callbackError: (preset: IPresetToast) => void
) => {
  const billingAddressStripe: IAddressStripeBilling = {
    name: cardName,
    phone: billingAddress.phone,
    email: billingAddress.email,
    address: {
      line1: billingAddress.address_1,
      line2: billingAddress.address_2,
      city: billingAddress.city,
      state: billingAddress.state,
      postal_code: billingAddress.postcode,
      country: billingAddress.country,
    },
  };
  const shippingAddressStripe: IAddressStripe = {
    name: shippingAddress.last_name,
    phone: billingAddress.phone,
    address: {
      line1: shippingAddress.address_1,
      line2: shippingAddress.address_2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postal_code: shippingAddress.postcode,
      country: shippingAddress.country,
    },
  };

  // getting the total order and id
  const { id, total } = order;
  if (!total) {
    sendNotesOrderWoo(
      id,
      "[Stripe Prep][ERROR] Order invalid: No total found in the order"
    );
    validateOrderWoo(id, null, false);
    callbackError(toastPreset.internal_Error);
    throw new IoError(
      "no total found in the order",
      errorTypesIdCheckout.INTERN_ERROR_ORDER_GENERAL,
      null
    );
  }
  //convert the total to a cents amount
  const amoutStripe = stripeConvertionAmount(Number(total))
  console.log('amout front >>>>>>>>>'+amoutStripe)
  handlePaymentStripe(
    stripe,
    billingAddressStripe,
    shippingAddressStripe,
    elements,
    amoutStripe,
    id,
    sendNotesOrderWoo,
    validateOrderWoo,
    listItem,
    method_id,
    callbackSucces,
    callbackError
  );
};

export const stripeConvertionAmount = (amount: number) => {
  return  Number(Number(amount).toFixed(2).replace('.',''))
}

/*=============================================
=            WOO COMMERCE ORDER UNTILS BACKEND      =
=============================================*/
/**
 * All function to manage order woocommerce
 * Those functions are only available for
 * the backend
 *
 */

//Library
import axios from "axios";

/**
 * validate order woocommerce from the backend
 *
 * @param publickey public key woocommerce
 * @param secretKey secret key woocommerce
 * @param order_id id of order
 * @param paymentintent_id  payment intent from the payment platform
 * @param paid boolean
 */
export const validateOrderFromBack = (
  publickey: string,
  secretKey: string,
  order_id: string | number,
  paymentintent_id: string | null,
  paid: boolean
) => {
  const data = {
    set_paid: paid,
    transaction_id: paymentintent_id ? paymentintent_id : "aucun",
    payment_method: "card",
    payment_method_title: "Card",
    status: paid ? "processing" : "failed",
  };
  const options = {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": true,
    },
    url:
      process.env.NEXT_PUBLIC_WC_API_ROUTE +
      "/orders/" +
      order_id +
      "?consumer_key=" +
      publickey +
      "&consumer_secret=" +
      secretKey,
    data,
  };
  axios
    .request(options)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

/**
 *
 * Send Note the the order woo commerce
 *
 * to send technical information related to the order
 * 
 * @param publickey public key woocommerce
 * @param secretKey secret key woocommerce
 * @param OderId id of the order
 * @param note the information about the order
 */
export const sendNotesOrderFromBack = (
  publickey: string,
  secretKey: string,
  order_id: string | number,
  note: string
) => {
  const data = {
    note: note,
  };
  const options = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": true,
    },
    url:
      process.env.NEXT_PUBLIC_WC_API_ROUTE +
      "/orders/" +
      order_id +
      "/notes/?consumer_key=" +
      publickey +
      "&consumer_secret=" +
      secretKey,
    data,
  };
  axios
    .request(options)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

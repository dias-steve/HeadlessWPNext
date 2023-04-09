/*=============================================
=            WOO COMMERCE ORDER UNTILS        =
=============================================*/
/**
 * All function to manage order woocommerce
 *
 */

// Library
import axios from "axios";

// Types
import {
  IBillingAddressWC,
  ILineItemsOrder,
  ILineShipping,
  IOrderTotalResponseBody,
  IOrderWC,
  IShippingAddressWC,
  IValidateOrderWooBody,
  IsendNotesOrderBody,
} from "../../checkout/types";
import { useDispatch } from "react-redux";

// Key
const publicKeyWoo: any = process.env.NEXT_PUBLIC_WC_PUBLIC_KEY;

/**
 * Create a new order
 *
 * gather all information
 * and send the order to the backend
 *
 * @param shipping address of shipping
 * @param billing address of billing
 * @param shippingMethode shipping methode chosen from the checkout
 * @param listItems list of items
 * @returns the order object created from the backend
 */
export const createOrder = async (
  shipping: IShippingAddressWC,
  billing: IBillingAddressWC,
  shippingMethode: ILineShipping,
  listItems: ILineItemsOrder[],
  customerNote: string
) => {
  // Create the order
  const body: any = {
    publickey: publicKeyWoo,
    order: {
      billing,
      shipping,
      line_items: listItems,
      shipping_lines: [shippingMethode],
      customer_note:  customerNote
    },
  };

  // Sending the order to the backend
  const order = await axios
    .post("/api/order/create", body)
    .then((response: any) => {
      if (response.error) {
        console.log(response.error);
        throw { message: "pb creattion order" };
        //sendMessageFlag('Error: validate order: '+response.error.message);
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      console.log(err.message);
      throw { message: "pb creattion order" };
    });

  return order;
};

/**
 * Validate Order Woo commercer
 *
 * Validate the order created
 *
 * @param OderId id of the order
 * @param paymentIntentid the payment intent from the payment plateform
 * @param paid boolean whether the order have been paid
 * @returns
 */

export async function validateOrderWoo(
  OderId: string | number,
  paymentIntentid: any,
  paid: boolean
) {
  const body: IValidateOrderWooBody = {
    publickey: publicKeyWoo,
    order_id: OderId,
    paymentintent_id: paymentIntentid,
    paid: paid,
  };




  return axios
    .post("/api/order/validate", body)
    .then((response: any) => {
      if (response.error) {
        //sendMessageFlag('Error: validate order: '+response.error.message);
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return null;
    });
}

/**
 *
 * Send Note the the order woo commerce
 *
 * to send technical information related to the order
 *
 * @param OderId id of the order
 * @param note the information about the order
 */
export async function sendNotesOrderWoo(OderId: string | number, note: string) {
  const body: IsendNotesOrderBody = {
    publickey: publicKeyWoo,
    order_id: OderId,
    note: note,
  };

  try {
    axios
      .post("/api/order/notes", body)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  } catch (err: any) {
    console.log(err.message);
  }
}

/**
 * get Ordee Total Query
 *
 * get query for the reques the calculation of the total amount of the order
 * from the backend
 *
 * it is for check the sanity of the order
 *
 * @param queryCart the same of the query stock order : ?products=id_parent=250,id=451,quantity=2!id_parent=32,id=32,quantity=1!id_parent=250,id=464,quantity=5
 * @param method_rate_id the unique id of the method rate : flateratey:ZE
 * @returns return the query concatenated
 */
export function getOrderTotalQuery(queryCart: string, method_rate_id: string) {
  return queryCart + "method_rate_id=" + method_rate_id;
}

/**
 * Chech Total fron Back WC
 *
 * @param queryCart the same of the query stock order : ?products=id_parent=250,id=451,quantity=2!id_parent=32,id=32,quantity=1!id_parent=250,id=464,quantity=5
 * @param method_rate_id the unique id of the method rate : flateratey:ZE
 * @param totalFront the total to compare to the backend's total
 * @param mutiplication the multiplaction convert from the backend : for compare the backend's total to stripe's total we have to multiply theby 100 the backend's total
 */
export async function checkTotalFromBackWC(
  queryCart: string,
  method_rate_id: string,
  totalFront: number,
  convertAmount : ((number: number) => number)| null
) {
  // Formating of the query
  const query = queryCart + "&method_rate_id=" + method_rate_id;

  // Sending the query to the backend
  // Getting the results
  const response: { data: IOrderTotalResponseBody } = await axios.get(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/orders/total" + query
  );

  // Cheching if the result is trustable
  // The back check the sanity of the product item list and the shipping methode chosen
  if (!response.data.trust_result.is_trust) {
    throw { message: "no trust cart" };
  } else {
    // Convertion of the total from the backend
    //const convertedAmout = Number(response.data.total) * mutiplication;

    const convertedAmount =   convertAmount!== null ? convertAmount(response.data.total) : Number(response.data.total)

    // Conparison
    if (Number(totalFront) !== convertedAmount) {
      console.log(response.data);
      const errorInfo = JSON.stringify(response.data);
      throw {
        message:
          "amount doesnt match: we received from backend:" +
          response.data.total +'(convertion='+convertedAmount+')'+
          " From frontend:" +
          totalFront +
          "[Detail from backend: " +
          errorInfo +
          "]",
      };
    }
  }
}

/**
 * get product's stock status from backend
 *
 * to check if all item in the cart is available
 *
 * @param query : ?products=id_parent=250,id=451,quantity=2!id_parent=32,id=32,quantity=1!id_parent=250,id=464,quantity=5
 */
export function getProductStockStatus(query: string) {
  axios
    .get(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA +
        "/products/stocks" +
        query
    )
    .then((response) => response.data)
    .catch((err) =>
      //throw err
      console.log(err.message)
    );
}

/*=============================================
=            Error Handler for checkout            =
=============================================*/
/**
 * Handle the error which occurred in the checkout
 */

import IoError from "@/errors/IoError";
import { ErrorMessageMapper } from "@/globalTypes";

export const codeErrorCheckout = {
  // FROM ERROR
  NO_METHOD_SHIPPING_SELECTED_BY_THE_USER: 4100,
  FLIED_NO_VALID: 4101,

  //TOTAL CHECKING
  AMOUNT_FRONT_UNDEFINED: 5500,
  AMOUT_ORDER_BACK_NOT_MATCH: 4200,
  AMOUT_FRONT_BACK_NOT_MATCH: 4201,
  AMOUT_FRONT_ORDER_NOT_MATCH: 4202,

  FETCHING_STOCK_STATUS_LIST_NOT_AVAILABLE: 5600,
};

/*=============================================
=            TYPE ERRORS            =
=============================================*/

export const errorTypesIdCheckout = {
  //FORM ERROR
  FORM_FIELD_USER_ERROR: "CHECKOUT_FORM_FEILD_ERROR",

  // CART ERROR
  ITEM_NOT_IN_STOCK: "ITEM_NOT_IN_STOCK",
  ITEM_NOT_IN_STOCK_PAYMENT: "ITEM_NOT_IN_STOCK_PAYMENT", // when we process the payment

  // ORDER ERROR
  INTERN_ERROR_ORDER: "INTERN_ERROR_ORDER",
  AMOUNT_NOT_MATCH: "AMOUNT_NOT_MATCH",
  INTERN_ERROR_ORDER_GENERAL: "INTERN_ERROR_ORDER_GENERAL",

  // PAYMENT ERROR
  CARD_DECLINED: "CHECKOUT_CARD_DECLINED",
  CARD_NOT_VALID: "CHECKOUT_CARD_NOT_VALID",
  INTERN_PAYMENT_ERROR: "CHECKOUT_INTERN_PAYMENT_ERROR",

  // GENERAL ERROR
  INTERN_GENERAL_ERROR: "GENERAL_INTERN_ERROR_CHECKOUT",
};

/*=====  End of TYPE ERRORS  ======*/

/*=============================================
=            Error Message            =
=============================================*/

export const errorMessageCheckout: ErrorMessageMapper = {
  // FORM ERROR
  [errorTypesIdCheckout.FORM_FIELD_USER_ERROR]: {
    FR: {
      title: "Formulaire invalide",
      message: "Veuillez remplir tous les champs obligatoire svp.",
    },
    EN: {
      title: "Invalid Form",
      message: "Please enter all required fields",
    },
  },

  // CART_ERROR
  [errorTypesIdCheckout.ITEM_NOT_IN_STOCK]: {
    FR: {
      title:
        "Désolé, certains produits dans votre panier ne sont plus en stock",
      message: "Veuillez modifier votre panier svp.",
    },
    EN: {
      title: "Sorry, some item in your cart are no longer available",
      message: "Please modify your cart.",
    },
  },

  [errorTypesIdCheckout.ITEM_NOT_IN_STOCK_PAYMENT]: {
    FR: {
      title:
        "Désolé, certains produits dans votre panier ne sont plus en stock",
      message:
        "Nous avons effectué aucun paiment, Veuillez modifier votre panier svp.",
    },
    EN: {
      title: "Sorry, some item in your cart are no longer available",
      message: "No payment have been processed, Please modify your cart.",
    },
  },

  // PAYMENT ERROR
  [errorTypesIdCheckout.CARD_DECLINED]: {
    FR: {
      title: "Paiment refusé",
      message: "Veuillez réesayer avec une autre moyen de paiement svp.",
    },
    EN: {
      title: "Card Declined",
      message: "Please try with another card.",
    },
  },
  [errorTypesIdCheckout.CARD_NOT_VALID]: {
    FR: {
      title: "Carte invalide",
      message: "Veuillez vérifier le numero de carte svp.",
    },
    EN: {
      title: "Card Not Valid",
      message: "Please try again with another card number",
    },
  },
  [errorTypesIdCheckout.INTERN_PAYMENT_ERROR]: {
    FR: {
      title: "Désolé, le service de payment est actuellement indisponible",
      message:
        "Nous avons effectué aucun paiment, Veuillez réessayer ulterieurment svp.",
    },
    EN: {
      title: "Sorry, the payment service is not available",
      message: "No payment have been processed, Please try again later.",
    },
  },
};
/*=====  End of Error Message  ======*/

export const errorHandlerCheckout = (error: IoError) => {
  switch (error.getType()) {
    default:
      return error;
  }
};

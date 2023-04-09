/*=============================================
=            CHECOUT UTILS validation FROM                 =
=============================================*/
/**
 * Form Validator
 */
import { ErrorStatusCheckout, ICheckoutState } from "../redux/checkoutSlice";
import validator from "validator";

/**
 * Get StatusValidation Checkout
 *
 * Generate the ErrorStatusCheckoutMatrix
 * used by the field component to check if the value is valid
 *
 * @param checkoutState state of the chexkout reducer
 * @returns the error status matrix to put at the checkout state
 */
export const getSatutsValidationCheckout = (
  checkoutState: ICheckoutState
): ErrorStatusCheckout => {
  const {
    shippingAddress,
    billingAddress,
    isDifferentBillingAddress,
    email,
    phone,
  } = checkoutState;
  let error: any = {};
  const shippingError = getSatutsValidationInput(
    shippingAddress,
    validationRulesCheckout
  );
  const billingAddressError = isDifferentBillingAddress
    ? getSatutsValidationInput(billingAddress, validationRulesCheckout)
    : {};
  const otherError = getSatutsValidationInput(
    { email, phone },
    validationRulesCheckout
  );

  if (Object.entries(shippingError).length > 0) {
    error["shippingAddress"] = shippingError;
  }
  if (Object.entries(billingAddressError).length > 0) {
    error["billingAddress"] = billingAddressError;
  }
  return { ...error, ...otherError };
};

export const getSatutsValidationPaymentFieldsSpripeCheckout = (  checkoutState: ICheckoutState) => {
  const {cardName} =checkoutState;
  const otherError = getSatutsValidationInput(
    { cardName },
    validationRulesCheckout
  );

  return otherError
}
/**
 * Get Status Validation Input
 *
 * Generate the matrix for a not nested field
 *
 *
 * @param inputObject : object of inout as Shipping Address in checkout state
 * @param validationRules: list of validation rules
 * @returns error status field matrix
 */
export const getSatutsValidationInput = (
  inputObject: any,
  validationRules: validationRules
) => {
  const result = Object.entries(inputObject).reduce<ErrorStatusCheckout>(
    (error, field, index) => {
      const [key, value] = field;
      if (validationRules[key] && !validationRules[key](value)) {
        error[key] = { message: "FR=Entrez une valeur valide svp|EN=Pease enter a valid value" };
      }
      return error;
    },
    {}
  );
  return result;
};

/*=============================================
=        Rules function validation              =
=============================================*/

/**
 *
 * Validation field type text
 * @param text
 * @returns
 */
export const isValidText = (text: string) => {
  return !validator.isEmpty(text, {
    ignore_whitespace: true,
  });
};

/**
 * Validation type email
 * @param email
 * @returns
 */
export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
};

/*=============================================
=        Rules Validation Map             =
=============================================*/

// type validation
export interface validationRules {
  [key: string]: (n: any) => boolean;
}
/**
 * List of rules validation
 * 
 *key = name of the field
 value function of validation
 */
export const validationRulesCheckout: validationRules = {
  first_name: isValidText,
  last_name: isValidText,
  address_1: isValidText,
  city: isValidText,
  state: isValidText,
  postcode: isValidText,
  country: isValidText,
  phone: isValidText,
  email: isValidEmail,
  cardName: isValidText,
};

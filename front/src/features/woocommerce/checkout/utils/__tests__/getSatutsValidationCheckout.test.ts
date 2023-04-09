import ShippementManager from "../../models/ShippementManager"
import { getSatutsValidationCheckout, validationRulesCheckout } from "../validateForm.utils"

const CHECKOUT_STATE_SAME_BILLING_ONE_ERR= {
    shippingAddress: {
        first_name: "Paul",
        last_name: "",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: "CA"
    },
    billingAddress: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "FR"
    },
    email:"gdhd@hdk.com",
    phone: "0998223",
    country: null,
    shippementManager: new ShippementManager(),
    shippingMethodAvailableList: [],
    totalAmount:0,
    shippingMethodSelected: null,
    isLoading: false,
    isValidForm: true,
    errorStatus: {},
    isDifferentBillingAddress: false,
}

const CHECKOUT_STATE_NOT_SAME_BILLING_ONE_ERR= {
    shippingAddress: {
        first_name: "Paul",
        last_name: "",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: "CA"
    },
    billingAddress: {
        first_name: "Paul",
        last_name: "Dum",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: ""
    },
    email:"gdhd@hdk.com",
    phone: "0998223",
    country: null,
    shippementManager: new ShippementManager(),
    shippingMethodAvailableList: [],
    totalAmount:0,
    shippingMethodSelected: null,
    isLoading: false,
    isValidForm: true,
    errorStatus: {},
    isDifferentBillingAddress: true,
}

const CHECKOUT_STATE_MAIL_PHONE_ERR= {
    shippingAddress: {
        first_name: "Paul",
        last_name: "DUM",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: "CA"
    },
    billingAddress: {
        first_name: "Paul",
        last_name: "Dum",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: ""
    },
    email:"gdhdhdk.com",
    phone: "",
    country: null,
    shippementManager: new ShippementManager(),
    shippingMethodAvailableList: [],
    totalAmount:0,
    shippingMethodSelected: null,
    isLoading: false,
    isValidForm: true,
    errorStatus: {},
    isDifferentBillingAddress: false,
}

const CHECKOUT_STATE_NO_ERR= {
    shippingAddress: {
        first_name: "Paul",
        last_name: "DUM",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: "CA"
    },
    billingAddress: {
        first_name: "Paul",
        last_name: "Dum",
        address_1: "45 young street",
        address_2: "",
        city: "Toronto",
        state: "Ontario",
        postcode: "PO9E",
        country: ""
    },
    email:"gdhd@hdk.com",
    phone: "677192",
    country: null,
    shippementManager: new ShippementManager(),
    shippingMethodAvailableList: [],
    totalAmount:0,
    shippingMethodSelected: null,
    isLoading: false,
    isValidForm: true,
    errorStatus: {},
    isDifferentBillingAddress: false,
}
describe('getSatutsValidationCheckout', ()=>{
    it('works with error with same billing ', () => {

        expect(getSatutsValidationCheckout(CHECKOUT_STATE_SAME_BILLING_ONE_ERR)).toStrictEqual(     {
            shippingAddress:{last_name: {message: 'Enter a valid value' }},
     

        })
    });


    it('works with error not same billing', () => {
        expect(getSatutsValidationCheckout( CHECKOUT_STATE_NOT_SAME_BILLING_ONE_ERR)).toStrictEqual(     {
            shippingAddress:{last_name: {message: 'Enter a valid value' }},
            billingAddress:{country: {message: 'Enter a valid value' }}
        })
    })

    it('works with error phone mail format ', () => {
        expect(getSatutsValidationCheckout( CHECKOUT_STATE_MAIL_PHONE_ERR)).toStrictEqual(     {
           email: {message: 'Enter a valid value' },
        phone: {message: 'Enter a valid value' }
        })
    })

    it('works no error ', () => {
        expect(getSatutsValidationCheckout( CHECKOUT_STATE_NO_ERR)).toStrictEqual({})
    })
})
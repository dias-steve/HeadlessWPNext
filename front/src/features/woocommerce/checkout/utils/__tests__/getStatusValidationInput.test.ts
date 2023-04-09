import { getSatutsValidationInput, validationRulesCheckout } from "../validateForm.utils"

const ADR_FORM_WITH_ONE_ERR =  {
    first_name: "Paul",
    last_name: "",
    address_1: "45 young street",
    address_2: "",
    city: "Toronto",
    state: "Ontario",
    postcode: "PO9E",
    country: "CA"
}

const ADR_FORM_WITH_TOW_ERR =  {
    first_name: "Paul",
    last_name: "",
    address_1: "45 young street",
    address_2: "",
    city: "Toronto",
    state: "Ontario",
    postcode: "",
    country: "CA"
}

const ADR_FORM_WITH_NO_ERR =  {
    first_name: "Paul",
    last_name: "Wide",
    address_1: "45 young street",
    address_2: "",
    city: "Toronto",
    state: "Ontario",
    postcode: "PDU8",
    country: "CA"
}

describe('Checkout ValidationForm', () => {
    it('Works with errors', () => {

        const rules = validationRulesCheckout
       expect(getSatutsValidationInput(ADR_FORM_WITH_ONE_ERR, rules )).toStrictEqual(
        {
            last_name: {message: 'Enter a valid value' }
        }
       )

       expect(getSatutsValidationInput(ADR_FORM_WITH_TOW_ERR, rules )).toStrictEqual(
        {
            last_name: {message: 'Enter a valid value'},
            postcode: {message: 'Enter a valid value'}
        }
       )

    })


    it('Works with no error', () => {

        const rules = validationRulesCheckout
        expect(getSatutsValidationInput(ADR_FORM_WITH_NO_ERR, rules )).toStrictEqual(
        {}
        )



    })
})
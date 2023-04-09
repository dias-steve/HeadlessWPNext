import ShippementManager from '../../models/ShippementManager';
import reducer, {ICheckoutState, setCountry} from './../checkoutSlice';

describe('Checkout Reducer Slice', () => {

    const shippementManager = new ShippementManager()
    const previousState :  ICheckoutState = {
        address: "",
        country: null,
        shippementManager: shippementManager
    }
    test('Work with setCountry FR', () => {
        expect(reducer(previousState, setCountry('FR'))).toEqual(
            {
                address: "",
                country: "FR",
                shippementManager: shippementManager
            }
        )
    })
})
/*=============================================
=            CHECKOUT SLICE            =
=============================================*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ShippementManager from '../models/ShippementManager';
import ShippingMethod from '../models/ShippingMethod';
import { IBillingAddressWC, IPartBillingAddressWC, IShippingAddressWC } from '../types';




/*=============================================
=            CHECKOUT STORE TYPE          =
=============================================*/

export interface ICheckoutState {
    shippingAddress: IShippingAddressWC;
    billingAddress:  IPartBillingAddressWC;
    email: string;
    phone: string;
    country: string | null;
    shippementManager: ShippementManager;
    shippingMethodAvailableList: ShippingMethod[];
    isFeachingMethodShippment: boolean;
    totalAmount: number;
    shippingMethodSelected: ShippingMethod | null;
    isLoading: boolean;
    isValidForm: boolean;
    isDifferentBillingAddress: boolean;
    errorStatus:ErrorStatusCheckout;
    currentStepFormToShow: number;
    maxStep: number;
    orderIdValidated: number | null;
    customerNote: string;
    cardName: string;

}

export interface ErrorStatusCheckout {
    [key: string]: any
}


/*=============================================
=            CHECKOUT INITIAL STATE          =
=============================================*/
const initialState: ICheckoutState = {
    shippingAddress: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "FR",
   
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
    email:"",
    phone: "",
    country: null,
    shippementManager: new ShippementManager(),
    shippingMethodAvailableList: [],
    isFeachingMethodShippment: false,
    totalAmount:0,
    shippingMethodSelected: null,
    isLoading: false,
    isValidForm: true,
    errorStatus: {},
    isDifferentBillingAddress: false,
    currentStepFormToShow: 1,
    maxStep: 1,
    orderIdValidated: null,
    customerNote: "",
    cardName:"",
}


/*=============================================
=            CHECKOUT ACTIONS           =
=============================================*/
const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {

        setCustomerNote: (state, action) => {
            state.customerNote= action.payload
        },
        setCardName: (state, action) => {
            state.cardName= action.payload
        },
        setOrderIdValidated: (state, action) => {
            state.orderIdValidated= action.payload
        },
        setNextStepFrom: (state, action) => {
            if(state.currentStepFormToShow < state.maxStep){
                state.currentStepFormToShow =  state.currentStepFormToShow+1
            }

        },
        setPreviousStepFrom: (state, action) => {
            if(state.currentStepFormToShow > 1){
                state.currentStepFormToShow =  state.currentStepFormToShow-1
            }
        },
        setMaxStepForm: (state, action) => {
            state.maxStep = action.payload
        },
        setCurrentStepFormToShow: (state, action) => {
            state.currentStepFormToShow = action.payload
        },
        setShippingMethodSelected: (state, action) => {
            state.shippingMethodSelected = action.payload
        },
        setIsFeachingMethodShippment: (state, action) => {
            state.isFeachingMethodShippment = action.payload
        },
        setErrorStatus: (state, action) => {
            state.errorStatus = action.payload
        },
        setIsDiffrentBillingAddress: (state, action) => {
            state.isDifferentBillingAddress = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },

        setIsValidForm: (state, action) => {
            state.isValidForm = action.payload
        },

        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        setBillingAddress: (state, action) => {
            state.billingAddress = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setCountryStart:(state,action) => {

        },
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setShippingMethodAvailableList: (state, action) => {
            state.shippingMethodAvailableList = action.payload
        },
        fetchShippingDataStart : (state) =>  {

        },
        setShippementManager: (state, action) => {
            state.shippementManager = action.payload
        },
        cleanCheckoutState: (state) => {
            state = {...initialState, shippementManager: state.shippementManager, orderIdValidated: state.orderIdValidated}
        }
    
    },

})

export const {
    setShippingMethodSelected,
    setIsFeachingMethodShippment,
    setErrorStatus,
    setCountry,
    setShippingMethodAvailableList,
    setShippementManager,
    fetchShippingDataStart,
    setCountryStart,
    setShippingAddress,
    setBillingAddress,
    setEmail,
    setPhone,
    setIsLoading,
    setIsValidForm,
    setIsDiffrentBillingAddress,
    cleanCheckoutState,
    setCurrentStepFormToShow,
    setMaxStepForm,
    setNextStepFrom,
    setPreviousStepFrom,
    setOrderIdValidated,
    setCustomerNote,
    setCardName

} = checkoutSlice.actions

export default checkoutSlice.reducer
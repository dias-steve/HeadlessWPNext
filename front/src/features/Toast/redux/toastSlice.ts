/*=============================================
=            MENU SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//Utils
import {IMenuResponse} from '../../../utils/initializePage.utils'


/*=============================================
=            Toast STORE TYPE          =
=============================================*/
export interface IToastStoreType {
    isShowToast: boolean;
    isPositive: boolean;
    message: null | string;
    title: null | string;
    withBtnClose: boolean
}

/*=============================================
=            toast INITIAL STATE        =
=============================================*/

const initialState: IToastStoreType = {
    isShowToast: false,
    isPositive: false,
    message: null,
    title: null,
    withBtnClose: true,
}

/*=============================================
=           toast ACTION      =
=============================================*/

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers:{
        setIsShowToastAction: (state, action) => {
            state.isShowToast = action.payload
        },
        setIsPositiveAction: (state, action) => {
            state.isPositive = action.payload
        },
        setMessageAction: (state, action) => {
            state.message = action.payload
        },
        setTitleAction: (state, action) => {
            state.title = action.payload
        },
        setWithBtnClose: (state, action) => {
            state.withBtnClose = action.payload
        },

        cleanToastAction: (state, action) => {
            state = initialState
        }

    }
});

export const {
    setIsShowToastAction,
    setIsPositiveAction, 
    setMessageAction, 
    setTitleAction,
    setWithBtnClose,
    cleanToastAction
  
} = toastSlice.actions;

export default toastSlice.reducer
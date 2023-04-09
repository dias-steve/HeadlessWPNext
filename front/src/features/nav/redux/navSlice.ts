/*=============================================
=            MENU SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//Utils
import {IMenuResponse} from '../../../utils/initializePage.utils'


/*=============================================
=            NAV STORE TYPE          =
=============================================*/
export interface INavStoreType {
    menuList: IMenuResponse | null;
    isShowNav: boolean;
    isColorWhite: boolean;
    isShowMenuModal: boolean;
    isEnableScrollListener: boolean;
}

/*=============================================
=            NAV INITIAL STATE        =
=============================================*/

const initialState: INavStoreType = {
    menuList: null,
    isShowNav: true,
    isColorWhite:false,
    isShowMenuModal: false,
    isEnableScrollListener: true
}

/*=============================================
=           NAV ACTION      =
=============================================*/

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers:{
        setMenuListAction: (state, action) => {
            state.menuList = action.payload
        },
        setIsShowNavAction: (state, action) => {
            state.isShowNav = action.payload
        },
        setIsColorWhiteAction: (state, action) => {
            state.isColorWhite = action.payload
        },
        setIsShowMenuModalAction: (state, action) => {
            state.isShowMenuModal = action.payload
        },
        setIsEnableScrollListener: (state, action) => {
            state.isEnableScrollListener = action.payload
        },
    }
});

export const {
    setMenuListAction,
    setIsShowNavAction, 
    setIsColorWhiteAction, 
    setIsShowMenuModalAction,
    setIsEnableScrollListener
} = navSlice.actions;

export default navSlice.reducer
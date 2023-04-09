/*=============================================
=            Dynamic BG SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



/*=============================================
=            NAV STORE TYPE          =
=============================================*/
export interface IDinamycBackgroundStoreType {
    isBlack: boolean;
}

/*=============================================
=            NAV INITIAL STATE        =
=============================================*/

const initialState: IDinamycBackgroundStoreType = {
    isBlack: false
}

/*=============================================
=           NAV ACTION      =
=============================================*/

const navSlice = createSlice({
    name: 'dynamicBackground',
    initialState,
    reducers:{
        setIsBlack: (state, action) => {
            state.isBlack= action.payload
        },
    }
});

export const {
    setIsBlack
} = navSlice.actions;

export default navSlice.reducer
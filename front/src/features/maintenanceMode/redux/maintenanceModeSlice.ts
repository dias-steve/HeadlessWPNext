/*=============================================
=            MENU SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



/*=============================================
=            maintenanceMode STORE TYPE          =
=============================================*/
export interface IMaintenanceModeStoreType {
    is_auth: boolean;
    date_auth: number | null;
}

/*=============================================
=            maintenanceMode INITIAL STATE        =
=============================================*/

const initialState: IMaintenanceModeStoreType = {
    is_auth: false,
    date_auth: null,
}

/*=============================================
=           maintenanceMode ACTION      =
=============================================*/

const maintenanceModeSlice = createSlice({
    name: 'maintenanceMode',
    initialState,
    reducers:{
 
        setIsAuthmaintenanceModeAction: (state, action) => {
            state.is_auth = action.payload
        },
        setdateAuthAction: (state, action) => {
            state.date_auth = action.payload
        },

    }
});

export const {
    setIsAuthmaintenanceModeAction,
    setdateAuthAction,
} = maintenanceModeSlice.actions;

export default maintenanceModeSlice.reducer
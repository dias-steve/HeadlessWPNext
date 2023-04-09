/*=============================================
=            SETTINGS SLICE            =
=============================================*/
/**
 * Stock all general settings website from the backend
 */

//library
import { ISettingsWebSiteResponse } from '@/utils/initializePage.utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


/*=============================================
=            SETTING STORE TYPE          =
=============================================*/

export interface ISettingsState {
   webSiteConfig: ISettingsWebSiteResponse
}

/*=============================================
=           INITIAL STATE                   =
=============================================*/

const initialState : ISettingsState = {
    webSiteConfig: {
        logo_src: false,
        url_front: false,
        name_site: "website",
        homepage_id_page: null,
        copyright: "copyright",
        maintenance_mode: {
            is_activated: false,
            page_maintenance_id: null,
        },
        languages_supported_list: null
    }
}

/*=============================================
=          ACTION                               =
=============================================*/

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        setWebSiteConfig:(state, action)=> {
            state.webSiteConfig = action.payload
        }
    }
});

export const {
    setWebSiteConfig
}= settingsSlice.actions;

export default settingsSlice.reducer;
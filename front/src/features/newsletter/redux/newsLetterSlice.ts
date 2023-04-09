/*=============================================
=           NewsLetter SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//Utils
import {IMenuResponse} from '../../../utils/initializePage.utils'


/*=============================================
=            newsLetter STORE TYPE          =
=============================================*/
export interface InewsLetterStoreType {

    isShowNewsLetterModal: boolean;
    isShowNewsLetterWidget: boolean;
    settings:{
        url_form_mailchip: string | false,
        title: string | false,
        text_widget: string | false,
        label_btn: string | false,
        maintenance_label_btn: string | false,
        title_maintenance: string | false,
    }
}

/*=============================================
=            newsLetter INITIAL STATE        =
=============================================*/

const initialState: InewsLetterStoreType = {
    isShowNewsLetterModal: false,
    isShowNewsLetterWidget: true,
    settings:{
        url_form_mailchip: false,
        title: false,
        text_widget: false,
        label_btn: false,
        maintenance_label_btn: false,
        title_maintenance: false,
    }
}

/*=============================================
=           newsLetter ACTION      =
=============================================*/

const newsLetterSlice = createSlice({
    name: 'newsLetter',
    initialState,
    reducers:{

        isShowNewsLetterModalAction: (state, action) => {
            state.isShowNewsLetterModal = action.payload
        },
        isShowNewsLetterWidgetAction: (state, action) => {
            state.isShowNewsLetterWidget = action.payload
        },
        setSettingsAction: (state, action) => {
            state.settings= action.payload
        }

    }
});

export const {

    isShowNewsLetterModalAction, 
    isShowNewsLetterWidgetAction,
    setSettingsAction

} = newsLetterSlice.actions;

export default newsLetterSlice.reducer
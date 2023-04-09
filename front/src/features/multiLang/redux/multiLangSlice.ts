/*=============================================
=            MENU SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



/*=============================================
=            MULTILANG STORE TYPE          =
=============================================*/
export interface IMultiLangStoreType {
    langList: string[],
    currentLang: string,
    changedByTheUser: boolean

}

/*=============================================
=            MULTILANG INITIAL STATE        =
=============================================*/

const initialState: IMultiLangStoreType = {
    langList: [],
    currentLang: 'FR',
    changedByTheUser: false,
}

/*=============================================
=           MULTILANG ACTION      =
=============================================*/

const multiLangSlice = createSlice({
    name: 'multiLang',
    initialState,
    reducers:{
        setlangListAction: (state, action) => {
            state.langList = action.payload
        },
        setCurrentLangAction: (state, action) => {
            state.currentLang = action.payload
        },
        setChangedByTheUserAction: (state, action) => {
            state.changedByTheUser = action.payload
        },
        

    }
});

export const {
    setCurrentLangAction,
    setlangListAction,
    setChangedByTheUserAction
} = multiLangSlice.actions;

export default multiLangSlice.reducer
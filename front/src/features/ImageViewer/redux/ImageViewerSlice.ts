/*=============================================
=            Image Viewer SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


/*=============================================
=            NAV STORE TYPE          =
=============================================*/
export interface IImageViewerStore{
    isShowViewer: boolean;
    listImages: {url: string, alt:string}[],
    currentImageIndex: number;
}

/*=============================================
=            INITIAL STATE        =
=============================================*/

const initialState: IImageViewerStore= {
    isShowViewer: false,
    listImages:[],
    currentImageIndex: 0
}

/*=============================================
=        ACTION      =
=============================================*/

const slice = createSlice({
    name: 'imageViewer',
    initialState,
    reducers:{
        setIsShowViwerAction: (state, action) => {
            state.isShowViewer = action.payload
        },
        setListImagesAction: (state, action) => {
            state.listImages = action.payload
        },
        setCurrentImageIndexAction: (state, action) => {
            state.currentImageIndex = action.payload
        },

    }
});

export const {
    setIsShowViwerAction,
    setListImagesAction, 
    setCurrentImageIndexAction, 
} = slice.actions;

export default slice.reducer
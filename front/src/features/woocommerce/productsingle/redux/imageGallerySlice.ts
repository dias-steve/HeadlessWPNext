/*=============================================
=            Dynamic BG SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IImageJSON } from '../../types';



/*=============================================
=            imageGallery STORE TYPE          =
=============================================*/
export interface IImageGallerySilce {
    imageList: IImageJSON[] 
}

/*=============================================
=            imageGallery INITIAL STATE        =
=============================================*/

const initialState: IImageGallerySilce  = {
    imageList: []
}

/*=============================================
=           NAV ACTION      =
=============================================*/

const imageGallerySlice = createSlice({
    name: 'imageGallery',
    initialState,
    reducers:{
        setImageGallery: (state, action) => {
            state.imageList= action.payload
        },
    }
});

export const {
    setImageGallery
} = imageGallerySlice.actions;

export default imageGallerySlice.reducer
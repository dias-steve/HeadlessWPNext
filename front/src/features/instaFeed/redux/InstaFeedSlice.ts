/*=============================================
=            Dynamic BG SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPostInstagram } from '../types';



/*=============================================
=            NAV STORE TYPE          =
=============================================*/
export interface IInstaFeedSlice {
    postsList : IPostInstagram[],
    isLoading: boolean
}

/*=============================================
=            NAV INITIAL STATE        =
=============================================*/

const initialState: IInstaFeedSlice  = {
   postsList: [],
   isLoading: false,
}

/*=============================================
=           NAV ACTION      =
=============================================*/

const instaFeedSlice = createSlice({
    name: 'instaFeed',
    initialState,
    reducers:{
        setPostList: (state, action) => {
            state.postsList= action.payload
        },

        setIsLoading: (state, action) => {
            state.isLoading= action.payload
        },
    }
});

export const {
    setPostList,
setIsLoading
} = instaFeedSlice .actions;

export default instaFeedSlice.reducer
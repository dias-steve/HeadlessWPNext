import { createSlice} from '@reduxjs/toolkit';
import { IJSONReponseRGPDSettings } from '../types';



export interface RGPDState {
    content: null | IJSONReponseRGPDSettings
    isAccepted: boolean;
}
const initialState : RGPDState = {
    content: null,
    isAccepted: false
}
const rgpdSlice = createSlice({
    name: "rgpd", 
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content = action.payload
        },
        setIsAccepted: (state, action) => {
            state.isAccepted = action.payload
        }
    }
})

export const {setContent, setIsAccepted} = rgpdSlice.actions

export default rgpdSlice.reducer
/*=============================================
=           use DynamicBackground         =
=============================================*/

/**
 * Manage the color of the background of the website
 * 
 */

//Types
import { IStore } from "@/redux/rootReducer"

//Libraries
import { useDispatch, useSelector } from "react-redux";

//State
import { setIsBlack } from "../redux/dynamicBackgroundSlice";

//Map state
const mapState = (state: IStore) => ({
    dynamicbackground: state.dynamicBackground
})

/**
 * Manage the color of the background of the website
 * @returns 
 */
export const useDynamicBackground = () => {
    const {dynamicbackground} = useSelector(mapState);
    const {isBlack} = dynamicbackground
    const dispatch = useDispatch()
    const setBlackBackground= () => {
        dispatch(
            setIsBlack(true)
        )
    }

    const setWhiteBackground= () => {
        dispatch(
            setIsBlack(false)
        )
    }
    
    return {
        isBlack,
        setBlackBackground,
        setWhiteBackground

    }
}
/*=============================================
=            USE TOAST     =
=============================================*/

//Reducer
import { useDispatch } from "react-redux";
import {
  cleanToastAction,
  setIsPositiveAction,
  setIsShowToastAction,
  setMessageAction,
  setTitleAction,
  setWithBtnClose,
} from "../redux/toastSlice";
import { useEffect } from "react";

/*=============================================
  =          TYPES      =
  =============================================*/
export interface IPresetToast {
  isPositive: boolean;
  message: null | string;
  title: null | string;
  withBtnClose: boolean;
  timeToDisplay: number | null;
  isScrollUp: boolean;
}
/*=====  End of TYPES ======*/

/**
 * Use Toast
 * Use to manage the dipaying of the popup
 * For give important information to the user
 * @returns
 */
export const useToast = () => {
  const dispatch = useDispatch();

  /**
   * Display a popup Toast relatif the the preset
   * @param preset preset setting relative to the displaying of the toast
   */
  const displayToastPreset = (preset: IPresetToast) => {
    const { isPositive, title, timeToDisplay, withBtnClose, message, isScrollUp } = preset;

    displayToast(title, message, isPositive, withBtnClose, timeToDisplay, isScrollUp );

  };

  /**
   * Process the displaying of the popup toast
   * @param title title of the message
   * @param message message of the information
   * @param isPositif is a positif information ?
   * @param withBtnClose display a closing button ?
   * @param timeToDisplay time to display the popup in ms
   */
  const displayToast = (
    title: null | string,
    message: null | string,
    isPositif: boolean,
    withBtnClose: boolean,
    timeToDisplay: number | null,
    isScrollUp : boolean
  ) => {
    dispatch(setTitleAction(title));
    dispatch(setMessageAction(message));
    dispatch(setIsPositiveAction(isPositif));
    dispatch(setWithBtnClose(withBtnClose));
    dispatch(setIsShowToastAction(true));
   
    if(isScrollUp){
     // window.scrollTo(0,0)
    }
    if (timeToDisplay) {
      setTimeout(() => dispatch(setIsShowToastAction(false)), timeToDisplay);
      dispatch(cleanToastAction(true));
    }
    



  };

  /**
   * Handle Close Modal or Popup
   * Use for the closing Button
   */
  const handleCloseModal = () => {
    dispatch(setIsShowToastAction(false));
    dispatch(cleanToastAction(true));
  };

  return {
    handleCloseModal,
    displayToast,
    displayToastPreset,
  };
};

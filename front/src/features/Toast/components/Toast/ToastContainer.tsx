/*=============================================
=            TOAST CONTAINER COMPONENTS       =
=============================================*/
/**
 * Toast Message
 * Use to display pop pu message into the screen
 */

//hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { useTranstionDisplayComponents } from "@/hook/useTransitionDisplayComponent";

//Libraries
import { IStore } from "@/redux/rootReducer";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

//Action
import { cleanToastAction, setIsShowToastAction } from "../../redux/toastSlice";

/*=============================================
=            TYPES      =
=============================================*/
export interface ToastProps {
  title: string | null;
  message: string | null;
  isPositif: boolean;
  itWillBeKilled: boolean;
  withBtnClose: boolean;
  handleCloseModal: () => void;

}

/*=====  End of TYPES ======*/

//MapState
const mapState = (state: IStore) => ({
  toast: state.toast,
});

/**
 * Toast Displayer Container
 * Use to display mesage into a toast popup
 * @param ToastView
 * @returns
 */
export const withToastContainer = (ToastView: FC<ToastProps>) => {
  return function Container() {
    const {
      toast: { title, message, isPositive, isShowToast, withBtnClose },
    } = useSelector(mapState);
    const { getTextStringTraduction } = useTraductor();
    const titleToast = title && getTextStringTraduction(title);
    const messageToast = message && getTextStringTraduction(message);
    const { isKilledComponent, isWillBeKilledCompponent } =
      useTranstionDisplayComponents(isShowToast, 400);
    const dispatch = useDispatch();
    
    /**
     * Close the popup
     */
    const handleCloseModal = () => {
      dispatch(setIsShowToastAction(false));
      dispatch(cleanToastAction(null));
    };
    return !isKilledComponent ? (
      <ToastView
        title={titleToast}
        message={messageToast}
        isPositif={isPositive}
        itWillBeKilled={isWillBeKilledCompponent}
        withBtnClose={withBtnClose}
        handleCloseModal={handleCloseModal}
      />
    ) : (
      <></>
    );
  };
};

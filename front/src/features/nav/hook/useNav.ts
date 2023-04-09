/*=============================================
=            USENav Hook            =
=============================================*/
/**
 * Used for managing the navigation
 */

import { IStore } from "@/redux/rootReducer"
import { menuItem } from "@/utils/initializePage.utils";
import { useSelector,  useDispatch } from "react-redux"
import { setIsColorWhiteAction, setIsEnableScrollListener, setIsShowMenuModalAction } from "../redux/navSlice";


//State mapping
const mapState = (state: IStore) => ({
    nav: state.nav
})


export const useNav = () => {
    const dispatch = useDispatch();
    const {nav: {menuList, isShowNav, isColorWhite, isShowMenuModal, isEnableScrollListener}} = useSelector(mapState);
    /**
     * Get the menu by key 
     * 
     * @param menuKey 
     * @returns Menu object
     */
    const getMenu = (menuKey: string) : null | menuItem => {
            if(!menuList){
                return null;
            }
            return menuList[menuKey] || null;
    }

    /**
     * process the hiding or showing menu
     * @param show boolean
     */
    const setIsShowMenuModalNav = (show:boolean) => {
        dispatch(setIsShowMenuModalAction(show))
    }
    
    /**
     * Handle Click Button Open Close Menu
     * Set the reverse value of showNav state
     */
    const handleClickOpenCloseNav = () => {
        dispatch(setIsShowMenuModalAction(!isShowMenuModal))
    }

    /**
     * Set the Nav color in white mode
     * 
     * @param beWhite boolean 
     */
    const setIsColorWhite = (beWhite:boolean) => {
        dispatch(setIsColorWhiteAction(beWhite))
    }

    const setIsEnableGeneralScrollListener = (isEnable: boolean) => {
        dispatch(setIsEnableScrollListener(isEnable))
    }
    return {
        getMenu,
        isShowNav,
        isColorWhite,
        isShowMenuModal,
        handleClickOpenCloseNav,
        setIsShowMenuModalNav,
        setIsColorWhite,
        setIsEnableGeneralScrollListener,
        isEnableScrollListener

    }
}
/*=============================================
=        MENU BTN CONTAINER            =
=============================================*/
/**
 * Button for handle the modale displaying
 */

//Hoooks
import { useNav } from "@/features/nav/hook/useNav";

//Types
import { FC } from "react";

/**
 * Handler the modale menu mobile displaying
 * @param MenuBugerBtn Presentational component button
 * @returns Compoment 
 */
export const withContainer = (MenuBugerBtn: FC<{handleClick: (e:any) => void, showCloseBtn: boolean}>)=>{

    return function Container () {

        const { handleClickOpenCloseNav, isShowMenuModal }=useNav()

        const  handleClick = (e: any) => {
            e.preventDefault();
            handleClickOpenCloseNav();
        }
        return (
            <MenuBugerBtn 
                handleClick= {handleClick}
                showCloseBtn = {isShowMenuModal}
                />
        )
    }
}
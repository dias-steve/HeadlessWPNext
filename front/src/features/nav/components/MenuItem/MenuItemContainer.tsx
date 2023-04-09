/*=============================================
=        MENU ITEM CONTAINER                 =
=============================================*/
/**
 * Menu Item Container
 * Manage the menu item displaying
 */

//Lib
import React, { Children, FC, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';


//Hooks
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import { useNav } from '../../hook/useNav';

/**
 * Menu Item Container
 * 
 * @param WrapperMenu Wrapper list child = btn link
 * @param MenuItemChild 
 * @param menuItemData Data from the state
 * @returns Compoment
 */
const withContainer = (WrapperMenu: FC<{children: ReactNode}>, MenuItemChild: FC<{label: string, link: string}>, menuId: string) => {

    return function Container() {

        const { getMenu } = useNav();

        //Getting menu from backend
        const menu = getMenu(menuId);

      
        const {getTextStringTraduction} = useTraductor()
        if (!menu){
            return <></>
        }
        const { childrens } = menu
        return (
            <WrapperMenu>
                {
                    childrens.map(child => (
                        <MenuItemChild 
                        key={uuidv4()}
                        label={getTextStringTraduction(child.name)}
                        link={child.link}
                        />
                    ))
                }
            </WrapperMenu>
        )
    }
}

export default withContainer

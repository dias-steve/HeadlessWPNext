/*=============================================
=        MENU ITEM  PRESANTATIONAL COMPONENTS                =
=============================================*/
/**
 * Display the menu with its child list
 */

//Lib
import React, { ReactNode } from 'react'

//Style
import styles from './MenuItem.module.scss';

//Container 
import withContainer from './MenuItemContainer';

//Utils
import { menuItem } from '../../../../utils/initializePage.utils';

//Components
import BtnSecondary from '@/components/atoms/btn/btnSecondary/BtnSecondary';

/**
 * Wrapper list child 
 * @param props children from react Node
 * @returns 
 */
function MenuItemWrapper({children}:{children: ReactNode}) {
  return (
    <div>
      {children}
    </div>
  )
}

/**
 * Display child item
 * @param param
 * @returns 
 */
function MenuItemChild({label, link}: {label: string, link: string}){
  return(
    <div className={styles.menu_child_wrapper}>
      <BtnSecondary 
        label={label}
        link={link}
        available={true}
        handleClick={() => {}}
        />
    </div>
  )
}

/**
 * Main Component witch wrapper the 
 * container with the right props
 * @param param0 
 * @returns 
 */
function MenuItem ({menuId} : {menuId : string} ){

  const ContainerData = withContainer(MenuItemWrapper,MenuItemChild,menuId) 
  return <ContainerData />
}
export default MenuItem

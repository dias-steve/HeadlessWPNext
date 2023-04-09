import React, {FC} from 'react';
import styles from './ProductFilter.module.scss';
import {withContainer } from './_productCategorieFilter.func';
import { BtnProps, WrapperProps } from './../../../types';
import { BtnCategory, WrapperListCategories } from '@/components/molecules/ProductFilterWidget/ProductFilterWidget';


/*=============================================
=           PRESENTATIONAL COMPONENT         =
=============================================*/

/**
 * 
 * BtnCategoryPresentation
 * @param {*} param0 
 * @returns 
 */
export const BtnOptionCategory : FC<BtnProps> = ({checked, label, handleClick} : BtnProps) => {
  return (
    <div  onClick={e => {handleClick(e)} } className={[styles.container_btn, checked ? styles.isActive : ""].join(" ")}>
      <span dangerouslySetInnerHTML={{__html:label}}   />
    </div>
  )
}

export default withContainer(BtnCategory, WrapperListCategories)

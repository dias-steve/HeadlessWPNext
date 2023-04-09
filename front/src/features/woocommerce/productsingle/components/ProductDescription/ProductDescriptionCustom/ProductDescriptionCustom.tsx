/*=============================================
=       PRODUCT DESCRIPTION PRESENTATIONAL COMPONENTS     =
=============================================*/
/**
 * 
 * Display the product description from a single product
 * */

//Libaries
import React, { useState } from 'react'

//Styles
import styles from './ProductDescriptionCustom.module.scss'

//Container
import withProductDescriptionContainer, { DescriptionViewProps } from '../ProductDescriptionContainer'

//Hooks
import useTraductor from '@/features/multiLang/hooks/useTraductor';

/**
 * Display the description from the SINGLE product
 * @param param0 
 * @returns 
 */
function ProductDescriptionCustom({description}:DescriptionViewProps) {
  const [showMore, setShowMore] = useState(false);
  /**
   * Show all the description
   */
  const handleShowMoreClick = () => {
    setShowMore(!showMore)
  }
  const {getTextStringTraduction}=useTraductor()
  return (
    <div>
    <div className={[styles.wrapper_text, showMore ? styles.showMore : styles.showLess].join(" ")} dangerouslySetInnerHTML={{__html:description}}/>
    <span className={styles.show_more_btn} onClick={(e) => {
      e.preventDefault();
    handleShowMoreClick()
    }}>{!showMore?'...'+getTextStringTraduction('FR=Voir plus+|EN=See more+'): getTextStringTraduction('FR=Voir moins-|EN=See less-')}</span>
    </div>
  )
}

export default withProductDescriptionContainer(ProductDescriptionCustom)

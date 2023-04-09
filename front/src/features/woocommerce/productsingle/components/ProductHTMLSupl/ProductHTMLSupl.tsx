import React from 'react'
import { useSingleProduct } from '../../hooks/useSingleProduct'
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import styles from './ProductUTMLSupl.module.scss'
function ProductHTMLSupl() {

    const { general_information} = useSingleProduct(null, false);
    const {getTextStringTraduction} = useTraductor()
    const htmlToInject = general_information?.html_information
  return (
    <>
    {htmlToInject &&  <div className={styles.html_style} dangerouslySetInnerHTML={{__html:getTextStringTraduction(htmlToInject) }}/>}
    </>
  )
}

export default ProductHTMLSupl

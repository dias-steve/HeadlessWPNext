/*=============================================
=       Spinner of the productList      =
=============================================*/
/**
 * Appear when the list of producr is loading
 */

//Components
import Spinner from '@/components/atoms/Spinner/Spinner'

//styles
import styles from './ProductListLoader.module.scss'

//Libraries
import React from 'react'

/**
 * Spinner for loading state
 * @returns 
 */
function ProductListLoader() {
  return (
    <div className = {styles.global_container} >
      <div className={styles.spinner_wrapper}>
      <Spinner blackCircle={false}/>
      </div>
    </div>
  )
}

export default ProductListLoader

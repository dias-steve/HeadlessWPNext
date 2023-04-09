/*=============================================
=        Product Categorie Image Presentation Container  =
=============================================*/
/**
 * Image Catgorie component
 */

//Libraries
import React from 'react'

//Container
import withProductCatgorieImageContainer, { ImageviewProps } from './ProductCategorieImageContainer'

//Styles
import styles from './ProductCategoryImage.module.scss'

//Component
import ImageBloc from '@/components/atoms/ImageBloc/ImageBloc'

/**
 * Image of the product category page
 * @param param0 
 * @returns 
 */
export function ProductCategoryImage({image}: ImageviewProps) {
  return (
    <div className={styles.image_wrapper} >
        <ImageBloc
            image={image}
            objectFit={'cover'}
        />
    </div>
  )
}

export default withProductCatgorieImageContainer(ProductCategoryImage)
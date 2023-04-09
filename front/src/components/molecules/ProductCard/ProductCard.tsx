/*=============================================
=        PRODUCT CARD              =
=============================================*/
/**
 * Presentational Component for the display of Product Card
 */

//Libraries
import React, { FC, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid';

//Styles
import styles from './ProductCard.module.scss'

//Types
import { ProductCardProps, ProductCardSizeTypes } from '../../../features/woocommerce/productlist/types'
import { IProductJSONAperçu } from '@/features/woocommerce/types'

//Container
import { withProductCardContainer } from './ProductCardContainer'

//Components
import ImageBloc from '@/components/atoms/ImageBloc/ImageBloc'
import BtnPrimary from '@/components/atoms/btn/BtnPrimary/BtnPrimary'
import Link from 'next/link'

/**
 * Product Card Wrapper
 * @param param0 
 * @returns 
 */
export const ProductCardWrapper : FC<{children: ReactNode}> = ({children}:{children: ReactNode}) => {
  return <div className={styles.global_wrapper}>
    {children}
  </div>
}

export const ListThumbnailView = ({listThumbnailAlt} :{listThumbnailAlt : false | null | {url: string|null|false, alt: string}[]}  ) => {

  return (
    <>
    <div className={styles.listThumnails_wrapper}>
      {
        listThumbnailAlt &&
        listThumbnailAlt.map((image) => {
          return<div key={uuidv4()} className={styles.image_thumbnail_container}> <ImageBloc image={image} objectFit={'fill'} /> </div>
        })
      }
    </div>
    </>
  )
}

/**
 * ProductCard displayer
 * @param param0 
 * @returns 
 */
export function ProductCard({title, link, price, imageGallery, cardSize, label, listThumbnailAlt }: ProductCardProps) {

  const image1 =  imageGallery && imageGallery.length > 0 && imageGallery[0]
  const image2 = imageGallery && imageGallery.length >= 2 && imageGallery[1]

  const getStyleSize = (cardSize:ProductCardSizeTypes ) => {
      switch (cardSize){
        case 'small':
          return styles.image_small;
        case 'medium small':
          return styles.image_medium_small;

        case 'large large':
          return styles.image_large_large;
        default:
          return ''
      }
  }
  const ImageGallery = () => {
    return (
      <div className={styles.image_gallery_container}>
        {image1 &&
          <div className={[styles.image, styles.image1,  getStyleSize(cardSize)].join(" ")}>
          <ImageBloc image={image1} objectFit={'fill'} />
          </div>
        }
        {image2 &&
          <div className={[styles.image, styles.image2,getStyleSize(cardSize)].join(" ")}>
          <ImageBloc image={image2} objectFit={'fill'} />
          </div>
        }
      </div>
    )
  }

  return (
  
    <div className={styles.global_container}>
      <Link href={link} >
      <div className={[styles.image_wrapper,getStyleSize(cardSize)].join(" ")}>
        <ImageGallery />
      </div>
      <ListThumbnailView listThumbnailAlt={listThumbnailAlt} />
      </Link>
      <div className={styles.info_container}>

      <Link href={link} >
      <h2 className={styles.title} dangerouslySetInnerHTML={{__html: title}}/>
      </Link>
        <div className={styles.btn_wrapper}>
        <BtnPrimary 
        available={true}
        grayColor={true}
        label={label}
        handleClick={null}
        link={link}
        withClose={false}
        style={false}
        handleClickClose={null}
        />
        </div>
      </div>
    </div>

  )
}

/**
 * Product Card Container
 * Shows the product info
 * @param param0 
 * @returns 
 */
export default  function ProductCardWithContainer ({productData, cardSize, labelBtn}:{productData: IProductJSONAperçu, cardSize: ProductCardSizeTypes, labelBtn: string}) {
  const ProductCardWithContainer = withProductCardContainer(productData, ProductCard, cardSize, labelBtn)
  return <ProductCardWithContainer />
}



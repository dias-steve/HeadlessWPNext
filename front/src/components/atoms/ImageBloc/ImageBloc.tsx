/*=============================================
=        IMAGE BLOC            =
=============================================*/
/**
 * Image optimized displayer
 */


//Libraries
import Image from 'next/image';
import React, { useState } from 'react';
//styles
import styles from './ImageBloc.module.scss';

/**
 * Image optimized displayer
 * @param param0 image {url , alt}, objectFit
 * @returns 
 */
export default function ImageBloc({image, objectFit, ...otherProps} : {image: {url: string | false | null, alt: string}, objectFit: "fill" | "contain" | "cover" | "none" | "scale-down" }) {

  
    const [imageState, setImageState]= useState({url: null, alt: null})
    const {url, alt} = image || {url: null, alt: null};
   
    const is_svg = (url: string) => {
      var isValid = /\.svg$/i.test(url);
      if (!isValid) {
        return false;
      }
      return true;
    }

  return (
        <div 

        className={styles.image_wrapper}>
          {image && url  &&
            is_svg(url) ? 
            
            <img
                className={[styles.image, styles.svg].join(" ")}
                src={url}
                alt={alt ? alt.toString() : ""}
                style={{objectFit: objectFit}}
                {...otherProps}
                />

                    :   
                    <> 
            {url &&
            <Image
            className={styles.image}
            src={url}
            alt={alt ? alt.toString() : ""}
            style={{objectFit: objectFit}}
            fill
            priority
       
            {...otherProps}
            />
              }
            </> 
          }
        </div>
  )
}

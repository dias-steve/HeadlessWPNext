/*=============================================
=        Image Viewer Presentational Components      =
=============================================*/
/**
 * Presentational components for the image viewer
 */
import React, { useEffect, useRef } from 'react';

//Styles
import styles from './ImageViewer.module.scss'

//Components
import { BtnCloseProps, BtnNextPrevProps, ImageGlobalContainerProps, ImageViewProps, WrapperProps, withImageViewerContainer } from './ImageViewerContainer'

/**
 * Image viewer Global Container
 * 
 * @param param0 
 * @returns 
 */
export const ImageViewerGlobalContainerView = ({itWillBeKilled, children}:ImageGlobalContainerProps ) => {
  return (
    <div className={[styles.global_container, itWillBeKilled ? styles.isHide: styles.isShow].join(" ")}>
        {children}
    </div>
  )
}

/**
 * Image Viewer Wrapper for image view
 * @param param0 
 * @returns 
 */
export const ImageViewerWrapperView = ({children}:WrapperProps ) => {
    return (
      <div className={[styles.global_wrapper].join(" ")}>
          {children}
      </div>
    )
  }

  /**
   * Image View
   * Single Image 
   * @param param0 
   * @returns 
   */
export const ImageView = ({url, alt, index, isCurrent}:ImageViewProps) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current &&  isCurrent){
            ref.current.scrollIntoView({   inline: 'center' })
        }
    },[])
    return (
        <div ref={ref} className={[styles.image_wrapper].join( " ")} id={'image-'+index}>
            <img  src={url} alt={alt}/>
        </div>
    )
}

/**
 * Btn close the imageviewer 
 * @param param0 
 * @returns 
 */
export const BtnClose = ({handleCloseImageViewer}:BtnCloseProps) => {
    return (
        <div className={[styles.btn_close].join(" ")}
            onClick={(e) => {
                e.preventDefault();
                handleCloseImageViewer();
            }}
        >
          <img src={'/icon-cross.svg'} alt={'close icone'}/>
        </div>
    )
}

/**
 * Btn next button
 * @param param0 
 * @returns 
 */
export const BtnNext= ({handleNextPrev}:BtnNextPrevProps) => {
    return (
        <div className={styles.icon}>
         
        </div>
    )
}

/**
 * Btn prev image
 * @param param0 
 * @returns 
 */
export const BtnPrev = ({handleNextPrev}:BtnNextPrevProps) => {
    return (
        <div>

        </div>
    )
}

export default withImageViewerContainer( ImageViewerGlobalContainerView,ImageViewerWrapperView, ImageView, BtnClose, BtnNext, BtnPrev )



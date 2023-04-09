/*=============================================
=       Gallery Presentational Components       =
=============================================*/
/**
 * Gallery Image for mobile
 */



//Container
import withGalleryContainer, { GlobalWrapperProps, ImageGalleryViewProps, ImageGalleryWindowsWrapperViewProps, ImageItem, StatusViewerProps } from "./GalleryContainer"

//Styles
import styles from './Gallery.module.scss';

//Conponents
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";

//Hooks
import { useIntersection } from "@/hook/useIntersection";



/**
 * Image Item View
 * @param param0 
 * @returns 
 */

const ImageGalleryView = ({url, alt, index, setCurrentIndex, onclick} :ImageGalleryViewProps ) => {

    const handleVisible = () => {
        setCurrentIndex(index)
    }
    const [element, isVisible ]  = useIntersection(handleVisible, false)

    return(
   

        <div ref={element} 
        onClick={ (e) => {e.preventDefault(); onclick()}}
        className= {[styles.global_container_Image, styles.dimention, ,true? styles.visible : styles.notVisible].join(" ")}>
     
            <ImageBloc image={{url, alt}} objectFit={'cover'} />
        
        </div>


    )
}

/**
 * Windows Wrapper View
 * @param param0 
 * @returns 
 */
const WindowsImageGalleryView = ( {children}:ImageGalleryWindowsWrapperViewProps) => {

    return (
        <div className= {[styles.global_container_windows].join(" ")}>
        {children}
        </div>
    )
}

/**
 * Global Wrapper
 * Wraps all the component
 * @param param0 
 * @returns 
 */
const GlobalWrapperImageGalleryView = ({children}: GlobalWrapperProps)=>{
    return (
        <div className={styles.global_image_gallery_wrapper}>
            {children}
        </div>
    )
}
/**
 * 
 * Status Viewer
 * show index of image showed
 * @param param0 
 * @returns 
 */
const StatusViewer = ({numberImage, currentImageIndex}:StatusViewerProps) => {
    const width = (currentImageIndex*100)/numberImage;
    return(
        <div className={styles.global_container_status_viewer}>
   
            <div className={styles.processbar}>
                <div style={{width: width+'%'}}className={styles.processbar_status}/>
            </div>
        </div>
    )
}

/**
 * Gallery Image 
 * @param param0 List of images
 */
export default  function Gallery ({imageList}: {imageList: ImageItem[]}) {
    const WithContainerGallery = withGalleryContainer(ImageGalleryView, WindowsImageGalleryView, StatusViewer, imageList, GlobalWrapperImageGalleryView )
    return <WithContainerGallery />
}
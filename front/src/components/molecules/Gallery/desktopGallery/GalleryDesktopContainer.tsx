/*=============================================
=      Gallery Container Components       =
=============================================*/
/**
 * Gallery Image Container
 */

import { useImageViewer } from "@/features/ImageViewer/hooks/useImageViewer";
import { FC, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";


/*=============================================
=       Types      =
=============================================*/
export interface ImageGalleryViewProps {
  url: string;
  alt: string;
  index: number;
  setCurrentIndex: (index: number) => void;
  onClick: () => void;
}

export interface ImageGalleryWindowsWrapperViewProps {
  children: ReactNode;
}

export interface StatusViewerProps {
  numberImage: number;
  currentImageIndex: number;
  pourcentage: number;
}

export interface ImageItem {
  id?: number;
  url: string | false | null;
  alt: string;
}

export interface GlobalWrapperProps {
  children: ReactNode;
}

/*=============================================
=         Container              =
=============================================*/

/**
 * Image Gallery Container
 * Manage the image displaying
 * @param ImageGalleryView Image Item View
 * @param WindowsImageGalleryView Windows wrapper image gallery
 * @param StatusViewer Status viewer
 * @returns Image Gallery Container
 */
export const withGalleryContainer = (
  ImageGalleryView: FC<ImageGalleryViewProps>,
  WindowsImageGalleryView: FC<ImageGalleryWindowsWrapperViewProps>,
  imageList: ImageItem[],
  GlobalWrapperImageGalleryView: FC<GlobalWrapperProps>
) => {
  return function Container() {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);



    const {handleClickOpenImageViewer}= useImageViewer()
    /**
     * Check if have next image
     * @returns boolean
     */
    const haveNext = () => {
      return currentImageIndex < imageList.length - 1;
    };

    /**
     * Check if have previous image
     * @returns boolean
     */
    const havePrevious = () => {
      return currentImageIndex > 0;
    };

    /**
     * Set the next image
     * @returns void
     */
    const handleNextImage = () => {
      if (haveNext()) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    };

    /**
     * Set the previous image
     * @returns void
     */
    const handlePreviousImage = () => {
      if (havePrevious()) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    };

    if (imageList && Array.isArray(imageList) && imageList.length > 0) {
      const numberImage = imageList.length;
      const pourcentage = (currentImageIndex * 100) / numberImage;

      return (
        <GlobalWrapperImageGalleryView>
          <WindowsImageGalleryView>
            {imageList.map((image, index) => {
              return (
                <>
                {image.url &&

                <ImageGalleryView
                  key={uuidv4()}
                  url={image.url}
                  alt={image.alt}
                  index={index}
                  setCurrentIndex={setCurrentImageIndex}
                  onClick={() => {handleClickOpenImageViewer(index)}}
                />
              }
              </>
              );
            })}
          </WindowsImageGalleryView>
        </GlobalWrapperImageGalleryView>
      );
    }
    return <></>;
  };
};

export default withGalleryContainer;

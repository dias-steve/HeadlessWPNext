/*=============================================
=       Gallery Container Components       =
=============================================*/
/**
 * Get and display the image gallery product
 */

//Components
import Gallery from "@/components/molecules/Gallery/mobileGallery/Gallery";
import GalleryDestktop from "@/components/molecules/Gallery/desktopGallery/GalleryDesktop";

//Hooks
import { useSingleProduct } from "../../hooks/useSingleProduct";
import { useMedia } from "@/hook/useMedia";
import { useEffect } from "react";

/**
 * Gallery of Product
 * 
 * @returns 
 */
export const GalleryProduct = () => {
  const { images_gallery } = useSingleProduct(null, false);
  const matches = useMedia("(max-width: 768px)");


  if (images_gallery) {
    return (
      <>
        {matches ? (
          <Gallery imageList={images_gallery} />
        ) : (
          <GalleryDestktop imageList={images_gallery} />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default GalleryProduct;

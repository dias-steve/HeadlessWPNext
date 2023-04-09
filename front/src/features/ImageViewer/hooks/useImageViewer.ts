/*=============================================
=        Use Image Viewer    =
=============================================*/
/**
 * Image Viewer Hook
 * To manage the image view reducer
 */



//Library
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//Reducer
import { IStore } from "@/redux/rootReducer";
import {
  setCurrentImageIndexAction,
  setIsShowViwerAction,
  setListImagesAction,
} from "../redux/ImageViewerSlice";

//Hooks
import { useSingleProduct } from "@/features/woocommerce/productsingle/hooks/useSingleProduct";

//Mapstate
const mapState = (state: IStore) => ({
  imageViewer: state.imageViewer,
});

/**
 * Use image viewer
 * Manage the image viewer reducer and state
 * To use in a single product page
 * @returns 
 */
export const useImageViewer = (
) => {
  const dispatch = useDispatch();
  const { imageViewer } = useSelector(mapState);

  const { images_gallery } = useSingleProduct(null, false);

  const handleClickOpenImageViewer = (index: number) => {
    if (index >= 0 && index < imageViewer.listImages.length) {
      dispatch(setCurrentImageIndexAction(index));
    }
    dispatch(setIsShowViwerAction(true));
  };
  const handleClickCloseImageView = () => {
    dispatch(setCurrentImageIndexAction(0));
    dispatch(setIsShowViwerAction(false));
  };

  const setCurrentImageIndex = (index: number) => {
    if (index >= 0 && index < imageViewer.listImages.length) {
      dispatch(setCurrentImageIndexAction(index));
    }
  };
  useEffect(() => {
    dispatch(setListImagesAction(images_gallery));
  }, [images_gallery]);

  return {
    handleClickOpenImageViewer,
    handleClickCloseImageView,
    imageViewer,
    setCurrentImageIndex,
    curentIndex: imageViewer.currentImageIndex,
  };
};

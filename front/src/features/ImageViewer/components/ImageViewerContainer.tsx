/*=============================================
=        Image Viewer Container     =
=============================================*/
/**
 * Container Image Viewer
 */

//Hook
import { useTranstionDisplayComponents } from "@/hook/useTransitionDisplayComponent";
import { useImageViewer } from "../hooks/useImageViewer";

//Reducer
import { IStore } from "@/redux/rootReducer";

//Libraries
import { FC, ReactNode} from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";


//Map State
const mapState = (state: IStore) => ({
  imageViewer: state.imageViewer,
});

/*=============================================
=           TYPE          =
=============================================*/

export interface WrapperProps {
  children: ReactNode;
}
export interface ImageGlobalContainerProps extends WrapperProps {
  itWillBeKilled: boolean;
}

export interface ImageViewProps {
  url: string;
  alt: string;
  index: string;
  isCurrent:boolean
}

export interface BtnCloseProps {
  handleCloseImageViewer: () => void;
}

export interface BtnNextPrevProps {
    handleNextPrev: () => void;
    available: boolean;
}

/*=============================================
=           Container       =
=============================================*/
/**
 * Image Viewer Container
 * 
 * @param ImageViewerGlobalContainer Container view for the image view components
 * @param ImageViewerWrapper Wrapper of all simgle image views
 * @param ImageView Single image view
 * @param BtnClose Close button
 * @param BtnNext Next image button
 * @param BtnPrev Prev image button
 * @returns 
 */
export const withImageViewerContainer = (
  ImageViewerGlobalContainer: FC<ImageGlobalContainerProps>,
  ImageViewerWrapper: FC<WrapperProps>,
  ImageView: FC<ImageViewProps>,
  BtnClose: FC<BtnCloseProps>,
  BtnNext: FC<BtnNextPrevProps>,
  BtnPrev: FC<BtnNextPrevProps>
) => {
  return function Container() {
    const {
      imageViewer: { isShowViewer, listImages, currentImageIndex },
    } = useSelector(mapState);

    const { isKilledComponent, isWillBeKilledCompponent } =
      useTranstionDisplayComponents(isShowViewer, 400);
    const { handleClickCloseImageView,  setCurrentImageIndex, curentIndex} = useImageViewer();
    const onClickClose = () => {
      handleClickCloseImageView();
    };

    /**
     * Next Available 
     * Check if have next image to show
     * @returns 
     */
    const nextAvailable = () => {
        if(listImages&& Array.isArray(listImages)) {
            if(currentImageIndex+1 <listImages.length){
                return true;
            }
        }
        return false;
        
    }

    /**
     * Prev Available
     * Check if have prev image to show
     * @returns 
     */
    const prevAvailable = () => {
        if(listImages&& Array.isArray(listImages)) {
            if(currentImageIndex-1 >=0){
                return true;
            }
        }
        return false;
        
    }

    /**
     * Prev
     * Goes to the next image to show
     */
    const onPrev = () => {
        if(prevAvailable()){
            setCurrentImageIndex(currentImageIndex-1)
        }
    }

    /**
     * Prev
     * Goes to the prev image to show
     */
    const onNext = () => {
        if(nextAvailable()){
            setCurrentImageIndex(currentImageIndex+1)
        }
    }

   
    return (
      <>
        {!isKilledComponent && (
          <ImageViewerGlobalContainer itWillBeKilled={isWillBeKilledCompponent}>
            <ImageViewerWrapper>
              {listImages.map((imageItem,index) => (
                <ImageView
                  key={uuidv4()}
                  url={imageItem.url}
                  alt={imageItem.alt}
                  index={String(index)}
                  isCurrent={Number(index) ===Number(curentIndex)}
                />
              ))}
            </ImageViewerWrapper>
            <BtnClose handleCloseImageViewer={onClickClose} />
            <BtnNext available={nextAvailable()}  handleNextPrev={onNext} />
            <BtnPrev available={prevAvailable()}  handleNextPrev={onPrev} />
          </ImageViewerGlobalContainer>
        )}
      </>
    );
  };
};

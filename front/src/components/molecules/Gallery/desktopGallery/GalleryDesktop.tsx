/*=============================================
=       Gallery Presentational Components       =
=============================================*/
/**
 * Gallery Image for Desktop
 */

//Container
import withGalleryContainer, {
  GlobalWrapperProps,
  ImageGalleryViewProps,
  ImageGalleryWindowsWrapperViewProps,
  ImageItem,
  StatusViewerProps,
} from "./GalleryDesktopContainer";

//Styles

import styles from "./GalleryDesktop.module.scss";

//Components
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";

//Hooks
import { useIntersection } from "@/hook/useIntersection";

/**
 * Image Item View
 * @param param0
 * @returns
 */

const ImageGalleryView = ({
  url,
  alt,
  index,
  setCurrentIndex,
  onClick
}: ImageGalleryViewProps) => {
  const handleVisible = () => {
    setCurrentIndex(index);
  };
  const [element, isVisible] = useIntersection(handleVisible, false);

  return (
    <div className={styles.global_container}>
      <div
        ref={element}
        onClick={ (e) => {e.preventDefault(); onClick()}}
        className={[
          styles.global_container_Image,
          styles.dimention,
          ,
          true ? styles.visible : styles.notVisible,
        ].join(" ")}
      >
        <ImageBloc image={{ url, alt }} objectFit={"cover"} />
      </div>
    </div>
  );
};

/**
 * Windows Wrapper View
 * @param param0
 * @returns
 */
const WindowsImageGalleryView = ({
  children,
}: ImageGalleryWindowsWrapperViewProps) => {
  return <>{children}</>;
};

/**
 * The Global Wrapper of the Gallery
 * @param param0
 * @returns
 */
const GlobalWrapperImageGalleryView = ({ children }: GlobalWrapperProps) => {
  return <div className={styles.global_image_gallery_wrapper}>{children}</div>;
};

/**
 * Gallery Image
 * @param param0 List of images
 */
export default function GalleryDestktop({
  imageList,
}: {
  imageList: ImageItem[];
}) {
  const WithContainerGallery = withGalleryContainer(
    ImageGalleryView,
    WindowsImageGalleryView,
    imageList,
    GlobalWrapperImageGalleryView
  );
  return <WithContainerGallery />;
}

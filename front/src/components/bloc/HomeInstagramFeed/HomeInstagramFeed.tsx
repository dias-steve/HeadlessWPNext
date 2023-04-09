/*=============================================
=            HomeInstagram Feed            =
=============================================*/

/**
 * Instagram Section for the home
 */

//Styles
import styles from "./HomeInstagramFeed.module.scss";

//Types
import { BlocProps } from "../type";
import { FC } from "react";

//Components
import InstagramFeed from "@/features/instaFeed/components/Instafeed";
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";

//Hooks
import { useHomeInstaFeedAnnimation } from "./useHomeInstaFeedAnnimation";
import { useDynamicBackgroundObserver } from "@/features/dynamicBackground/hooks/useDynamicBackgroundObserver";
import { LookbookGallery } from "@/features/lookbook/components/LookbookGallery/LookbookGallery";

/**
 * Lankmark to process the change of the color
 * of the background
 * @returns
 */
export const LandmarkBGColorChanging = () => {
  const { refLandmarkChangeBGColor } = useDynamicBackgroundObserver();

  return <div className={styles.bearing} ref={refLandmarkChangeBGColor} />;
};

/**
 * Instagram Section for the home
 * @param param0 
 * @returns 
 */
export const HomeInstagramFeed: FC<BlocProps> = ({ content, gsap }) => {
  const { image_gallery, label_main_btn, link_1 } = content;

  const { contentRef } = useHomeInstaFeedAnnimation(gsap);
  return (
    <GlobalContainer padding={false}>
      <LandmarkBGColorChanging />
      { image_gallery &&
      <div ref={contentRef}>
      <LookbookGallery
                imageGallery={image_gallery}
                padding={false}
                labelBtn={label_main_btn|| null}
                linkBtn={link_1|| null}
                counter={3}
                />
                </div>

      }
    </GlobalContainer>
  );
};

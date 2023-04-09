import React from 'react'
import { BlocProps } from '../type'
import { LookbookGallery } from '@/features/lookbook/components/LookbookGallery/LookbookGallery'
import { ILookbook } from '@/features/lookbook/types'
import styles from './LookbookFeed.module.scss'
import { useDynamicBackgroundObserver } from '@/features/dynamicBackground/hooks/useDynamicBackgroundObserver'
export const LandmarkBGColorChanging = () => {
    const { refLandmarkChangeBGColor } = useDynamicBackgroundObserver();
  
    return <div className={styles.bearing} ref={refLandmarkChangeBGColor} />;
  };
export  const LookbookFeed = ({content, gsap}: BlocProps) => {
    const {content_supl} : {content_supl: ILookbook | false | null}=content
    if(content_supl){
        const {link_main_btn_lookbook, label_main_btn_lookbook, gallery} = content_supl
        return (
            <div className={styles.gloabal_container}>
                <LandmarkBGColorChanging />
              <LookbookGallery
                imageGallery={gallery}
                padding={false}
                labelBtn={label_main_btn_lookbook || null}
                linkBtn={link_main_btn_lookbook || null}
                counter={21}
                />
            </div>
          )
    }else{
        return (<></>)
    }

}

export default LookbookFeed

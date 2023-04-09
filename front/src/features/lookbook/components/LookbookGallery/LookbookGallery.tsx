/*=============================================
=            HomeInstagram Feed            =
=============================================*/

/**
 * Instagram Section for the home
 */

//Styles
import styles from "./LookbookGallery.module.scss";

//Types

import { FC } from "react";

//Components
import InstagramFeed from "@/features/instaFeed/components/Instafeed";
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";

//Hooks
import BtnPrimary from "@/components/atoms/btn/BtnPrimary/BtnPrimary";
import useTraductor from "@/features/multiLang/hooks/useTraductor";




/**
 * Instagram Section for the home
 * @param param0 
 * @returns 
 */
export const LookbookGallery = ({imageGallery, padding, labelBtn, linkBtn, counter} : {imageGallery:{url: string, alt: string | false}[], padding: boolean, labelBtn: string | null, linkBtn: string | null, counter: number} ) => {
 
  const {getTextStringTraduction} = useTraductor();
  return (
    <GlobalContainer padding={padding}>
      <GlobalContent>
        <div  className={styles.wrapper_instafeed}>
          {
            <InstagramFeed
              postsList={imageGallery}
              counter={counter}
              token={
                "IGQVJVMHdUeTR2aEdBamVNQWdOWVdGLXZADMXlrZAUhGR2d1eWFLc0Y4S29uUmV6dUZAnU04xaC1NaUF5UFpoTGJ2WFFVa1BOTUFZAYmZAZAWGpYbVcwWVBXeGV4RTVTNnZASeDRzQVNkaXVJQmprX0NzUDJWeQZDZD"
              }
            />
          }
        </div>
      </GlobalContent>
      { labelBtn && labelBtn !== null &&
        linkBtn && linkBtn !== null &&
      <GlobalContent>
        <div className={styles.btn_wrapper}>
        <BtnPrimary 
          available={true}
          label={getTextStringTraduction(labelBtn)}
          link={linkBtn}
          style={{}}
          handleClick={null}
          grayColor={false}
          withClose={false}
          handleClickClose={null}
        />
        </div>
      </GlobalContent>
      }
    </GlobalContainer>
  );
};

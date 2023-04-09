/*=============================================
=        HOME HERO BLOC         =
=============================================*/
/**
 * Style component displaying home hero section
 */

//Libraries
import { FC, useRef, useState } from "react";
import Link from "next/link";

//Types
import { BlocProps } from "../type";

//Components
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";
import DotRing from "@/features/customCursor/components/DotRing/DotRing";

//Styles
import styles from "./HomeHero.module.scss";

//Animations
import { useHomeHeroAnnimation } from "./useHomeHeroAnnimation";
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { GlobalContent } from "@/components/atoms/container/GlobalContainer/GlobalContainer";

/**
 * Style component displaying home hero section
 * @param param0
 * @returns
 */

const TitleComponent = ({title_1}:{title_1:string|false}) =>{
  const {getTextStringTraduction}= useTraductor()
  const title = title_1 ? getTextStringTraduction(title_1): " ";
  return(<h1 className={styles.title}dangerouslySetInnerHTML={{__html:title }}/>)
}
export const HomeHero: FC<BlocProps> = ({ content, gsap }) => {
  const { image1, image2, link_1, title_1, label_main_btn } = content;

  const { imagBackRef, sectionRef } = useHomeHeroAnnimation(gsap);


  /**
   * Body of the component
   * @returns
   */
  const Body = () => {
    return (
      <div ref={sectionRef} className={styles.global_content}>
        <div ref={imagBackRef} className={styles.image_fond_wrapper}>
          { image1.url && image1.url !== "" ? 
          <ImageBloc image={image1} objectFit={"contain"} />:
          <div className={styles.title_wrapper}>
          <GlobalContent>
          <TitleComponent title_1={title_1} />
          </GlobalContent>
          </div>
          }
        </div>
        <div className={styles.image_wrapper}>
        { image2.url && image2.url !== "" && 
          <ImageBloc image={image2} objectFit={"contain"} />
        }

        </div>
      </div>
    );
  };

  if (link_1) {
    return (
      <section className={styles.global_container}>
        <Link className={styles.link} href={link_1}>
          <div className={styles.cursor_wrapper}>
            <DotRing label={label_main_btn||'FR=Voir|EN=See'} />
          </div>

          <Body />
        </Link>
      </section>
    );
  } else {
    return (
      <section className={styles.global_container}>
        <Body />
      </section>
    );
  }
};

export default HomeHero;

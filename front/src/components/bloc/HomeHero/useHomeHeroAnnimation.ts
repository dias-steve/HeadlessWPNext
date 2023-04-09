/*=============================================
=        Home Hero annimation      =
=============================================*/
/**
 * Manage Home Hero annimation
 */

import { useMedia } from "@/hook/useMedia";
import { useEffect, useRef } from "react";

/**
 * Annimate the home hero page
 * @param gsap gsap module
 * @returns
 */
export const useHomeHeroAnnimation = (gsap: any) => {
  const imagBackRef = useRef(null);
  const imageFrontRef = useRef(null);
  const sectionRef = useRef(null);
  const isMobile = useMedia("(max-width: 768px)")
  /*=====  End of ANNIMATION PROCESSING  ======*/

    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtion = () => {
      const elObject =   imagBackRef.current;
      gsap
        .timeline()
        .fromTo(
          elObject,
          {
            scale:0.5,
            opacity: 0,
       
          },
          {
            scale: 1,
            opacity: 1,
 
          }
        );
    };

    useEffect(() => {
      appearAnniamtion();
    });
      /*=====  End of ANNIMATION PROCESSING  ======*/
  /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
  const slideToTopAnnimation = () => {
    const elObject = imagBackRef.current;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: elObject,
          start: "50% 50%",
          end:  isMobile ?  "100% -85%": "100% -70%",
          toggleActions: "restart none reverse none",
          scrub: 0,
   
        },
      })
      .fromTo(
        elObject,
        {
          y: "0%",
          scale: 1,
        },
        {
          y: isMobile ?"85%":"70%",
          scale: 0.7,
        }
      );
  };
  useEffect(() => {

   slideToTopAnnimation();
  },[isMobile]);



  return {
    imagBackRef,
    imageFrontRef,
    sectionRef
  };
};

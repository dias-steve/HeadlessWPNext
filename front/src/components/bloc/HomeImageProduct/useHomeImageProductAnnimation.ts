/*=============================================
=        Home Image Product annimation      =
=============================================*/
/**
 * Manage Home Hero annimation
 */

import { useEffect, useRef } from "react";

/**
 * Annimate the home hero page
 * @param gsap gsap module
 * @returns
 */
export const useHomeImagePorductAnnimation = (gsap: any) => {
  const imageRef = useRef(null);
  const productListRef = useRef(null);
  const sectionRef = useRef(null);
  /*=====  End of ANNIMATION PROCESSING  ======*/

    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtion = () => {
      const elObject =   imageRef.current;
      const productList = productListRef.current
      gsap
        .timeline({
          scrollTrigger: {
            trigger: elObject,
            start: "60% 100%",
            end: "100% -60%",
            //toggleActions: "restart none reverse none",
     
          },})
        .fromTo(
          elObject,
          {
            duration: 0.5,
            scale:0.6,
            opacity: 0,
       
          },
          {
            scale: 1,
            opacity: 1,
 
          })
    };

    useEffect(() => {
      appearAnniamtion();
    });
      /*=====  End of ANNIMATION PROCESSING  ======*/
    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtionListPorudct = () => {
      const elObject =   imageRef.current;
      const productList = productListRef.current
      gsap
        .timeline({
          scrollTrigger: {
            trigger:productList,
            start: "60% 100%",
            end: "100% -60%",
            //toggleActions: "restart none reverse none",
     
          },})
        .fromTo(
            productList,
            {
              
              duration: 0.3,
              opacity: 0,
         
            },
            {
         
              opacity: 1,
   
            }, "0.2"
        );
    };

    useEffect(() => {
      appearAnniamtionListPorudct();
    },[]);
      /*=====  End of ANNIMATION PROCESSING  ======*/




  return {
    imageRef,
    productListRef,
  };
};

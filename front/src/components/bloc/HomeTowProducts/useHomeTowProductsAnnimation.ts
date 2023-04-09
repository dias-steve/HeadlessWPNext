/*=============================================
=        Home Tow Product annimation      =
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
export const useHomeTowPorductAnnimation = (gsap: any) => {
  const imageRef = useRef(null);
  const productListRef = useRef(null);

  /*=====  End of ANNIMATION PROCESSING  ======*/

    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtion = () => {
 
      const productList = productListRef.current
      gsap
        .timeline({
          scrollTrigger: {
            trigger: productList,
            start: "60% 100%",
            end: "100% -60%",
            //toggleActions: "restart none reverse none",
     
          },})
        .fromTo(
          productList,
          {
            duration: 0.5,
          
            opacity: 0,
       
          },
          {
         
            opacity: 1,
 
          })
    };

    useEffect(() => {
      appearAnniamtion();
    });
      /*=====  End of ANNIMATION PROCESSING  ======*/





  return {
    imageRef,
    productListRef,
  };
};

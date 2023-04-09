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
export const useHomeInstaFeedAnnimation = (gsap: any) => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtionListPorudct = () => {

      const productList =  contentRef.current
      gsap
        .timeline({
          scrollTrigger: {
            trigger:productList,
            start: "30% 70%",
            //end: "100% -60%",
           // toggleActions: "restart none reverse none",


     
          },})
        .fromTo(
            productList,
            {
              
              duration: 0.3,
              opacity: 0,
              y:'150',
             
           
         
            },
            {
         
              opacity: 1,
              y:'0',
             
   
            }, 
        );
    };

    useEffect(() => {
      appearAnniamtionListPorudct();
    },[]);
      /*=====  End of ANNIMATION PROCESSING  ======*/




  return {
    contentRef,

  };
};

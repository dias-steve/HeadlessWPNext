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
export const useProductPageAnnimation = (gsap: any) => {
  const galleryRef = useRef(null);
  const productInfoRef = useRef(null);
  const sectionRef = useRef(null);
  const optionRef = useRef(null);
  //const isMobile = useMedia("(max-width: 768px)")
  /*=====  End of ANNIMATION PROCESSING  ======*/

    /*=============================================
    =            Home Image Back Annimation         =
    =============================================*/
    const appearAnniamtion = () => {
      const elObject =   galleryRef.current;
      const elInfoPorduct = productInfoRef.current
   
      gsap
        .timeline()
        .fromTo(
          elObject,
          {
     
   
            opacity: 0,
       
          },
          {
      
            opacity: 1,
 
          }, '0.1'
        ).fromTo(
          elInfoPorduct,
          {
     
          
            opacity: 0,
       
          },
          {
          
            opacity: 1,
 
          }

        ,'0.5')
    };


    const optionAppearing = () => {
      const elOption = optionRef.current
      gsap
        .timeline()
      .fromTo(
        elOption ,
        {
   
        
          opacity: 0,
     
        },
        {
        
          opacity: 1,

        }

      ,'0.6');
    }
    useEffect(() => {
      appearAnniamtion();
    },[]);
      /*=====  End of ANNIMATION PROCESSING  ======*/

    useEffect(() => {
      optionAppearing()
    },[])




  return {
    galleryRef,
    productInfoRef,
    sectionRef,
    optionRef
    
  };
};

export default useProductPageAnnimation 